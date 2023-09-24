from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


from ..models.auth import User, PhoneOtp

from random import randint
from django.utils import timezone


BASE_URL = "5vdkpg.api.infobip.com"
API_KEY = "App 5ac034bf83bd5b1e6da3101f7fff232a-392cce65-39c4-4039-b00c-a319d7e4f8e4"

SENDER = "InfoSMS"

testUsers = set(['9999999991', '7777777777'])

# Auth serializers


class GenerateOtpSerializer(serializers.Serializer):
    phone = serializers.IntegerField(
        required=True, min_value=6000000000, max_value=9999999999)


@api_view(['POST', ])
def generate_otp(request):
    """Takes `phone` as `POST` parameter and sends otp to user
    returns {'success': 'ok', 'info': 'User exists'} if user already exists
    else returns { 'success': 'ok' }. Incase user has exceeded limit
    returns { 'error': 'OTP limit exhausted' }"""

    serializer = GenerateOtpSerializer(data=request.data)
    if not serializer.is_valid():
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(dict(success='nok', info='User exists'))

    response_dict = dict(success='ok')

    # generate otp
    # otp = randint(100000, 999999)
    otp = str(randint(999, 9999))
    phone = serializer.validated_data.get('phone')

    # For test users
    if str(phone) in testUsers:
        return Response(dict(success='ok', info='User exists'))

    # get or create PhoneOtp instance in database
    phone_otp = PhoneOtp.objects.filter(phone=phone)

    if phone_otp.exists():
        phone_otp = phone_otp.last()

        # check if phone number has exhausted OTP limit
        if phone_otp.session_attempts >= phone_otp.limit_attempts:  # if session attempts are greater than limit
            # if current time is greater than user's latest_successful_attempt + 14 days
            if timezone.now() > (phone_otp.latest_attempt + timezone.timedelta(days=14)):
                phone_otp.session_attempts = 0  # then reset session attemps to 0
            else:
                return Response(dict(error='OTP limit exhausted'))

        phone_otp.session_attempts += 1
        phone_otp.lifetime_attempts += 1
        phone_otp.otp = otp
        phone_otp.latest_attempt = timezone.now()
        phone_otp.save()
    else:
        phone_otp = PhoneOtp.objects.create(
            phone=phone, otp=otp, lifetime_attempts=1, session_attempts=1, latest_attempt=timezone.now())

    # send OTP to user
    sendOTP(phone, otp)

    # check if user with this phone exists
    user = User.objects.filter(phone=phone)
    if user.exists():
        response_dict['info'] = 'User exists'

    return Response(response_dict)


class ValidateOtpSerializer(serializers.Serializer):
    phone = serializers.IntegerField(
        required=True, min_value=6000000000, max_value=9999999999)
    otp = serializers.IntegerField(required=True, max_value=999999)
    name = serializers.CharField(required=False, max_length=55)


@api_view(['POST', ])
def validate_otp(request):
    """Takes `phone`, `otp` and optionally `name` as `POST` parameters 
    if otp is correct returns {'access': JWT_ACCESS_TOKEN, 'refresh': JWT_REFRESH_TOKEN}
    else returns {'error': ERROR_MESSAGE}"""

    serializer = ValidateOtpSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # validated data recieved from the request
    data = serializer.validated_data

    if str(data.get('phone')) in testUsers:
        if data.get('otp') == 9987:
            user, created = User.objects.get_or_create(phone=data.get('phone'))
            # token = Token.objects.get(user=user)
            return Response(dict(success='ok', token='token.key', user_id=user.pk))

    # check if phone otp model exists with given phone and otp
    phone_otp = PhoneOtp.objects.filter(
        phone=data.get('phone'), otp=data.get('otp'))

    # if otp instance does not exists that means otp is incorrect
    if not phone_otp.exists():
        return Response(dict(error='Incorrect OTP'))

    phone_otp = phone_otp.last()

    # make sure otp is not older than 15 minutes
    if phone_otp.latest_attempt < (timezone.now() - timezone.timedelta(minutes=15)):
        return Response(dict(error='OTP has expired'))

    user, created = User.objects.get_or_create(phone=data.get('phone'))

    if data.get('name'):
        user.name = data.get('name')
        user.save()

    print('User created: ', user)

    return Response(get_tokens_for_user(user))


def sendOTP(phone, otp):
    print('OTP sent to ' + str(phone) + ' is ' + str(otp))

    # print(f'OTP {otp} sent to {phone}')
    # api_key = '4102eb2b-3e27-11eb-83d4-0200cd936042'
    # headers = { "content-type": "application/x-www-form-urlencoded" }
    # template_name = 'OTPWithHash'
    # hexable = 'asfdkhkl'

    # payload = f"{{\"From\": \"CHEFCI\",\"To\": \"{phone}\", \"TemplateName\": \"{template_name}\", \"VAR1\": \"{otp}\", \"VAR2\": \"{hexable}\"}}"

    # url = f'https://2factor.in/API/V1/{api_key}/ADDON_SERVICES/SEND/TSMS'
    # response = requests.post(url, data=payload, headers=headers)

    # template_name = 'OTPTemplate'
    # headers = {'content-type': "application/x-www-form-urlencoded"}
    # response = requests.get(
    #     f"https://2factor.in/API/V1/{api_key}/SMS/91{phone}/{otp}/{template_name}", headers=headers)
    # print(response.json())


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['GET', ])
def get_phone_number(request):
    return Response({
        'phone': request.user.phone
    })
