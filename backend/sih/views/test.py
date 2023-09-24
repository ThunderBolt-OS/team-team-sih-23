from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['GET', 'POST'])
@permission_classes([])
def test_no_auth(request):
    print("[request.user]", request.user)
    print("[request.headers]", request.headers)
    print("[request.data]", request.data, "\n")
    return Response({'message': 'success'})


@api_view(['GET',])
@permission_classes([IsAuthenticated])
def test_auth(request):
    return Response({'message': 'user is authenticated'})
