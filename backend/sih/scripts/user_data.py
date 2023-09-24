from ..models import User, PoliceStation

user_data_list = [
    {
        "mobile": "9994449990",
        "name": "[Network Admin] series 4",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9994449991",
        "name": "[4] Harshal Dave",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9994449992",
        "name": "[4] Hussain Pettiwala",
        "email": "p.hussain@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HussainPettiwala.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    {
        "mobile": "9994449993",
        "name": "[4] Aditya Pai",
        "email": "aditya.p@gmail.com",
        "image_url": "https://black-bridge.surge.sh/AdityaPai.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9994449994",
        "name": "[4] Soham Bhoir",
        "email": "soham.b@gmail.com",
        "image_url": "https://black-bridge.surge.sh/SohamBhoir.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },

    #############################################################################################################
    {
        "mobile": "9993339990",
        "name": "[Network Admin] series 3",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9993339991",
        "name": "[3] Harshal Dave",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9993339992",
        "name": "[3] Hussain Pettiwala",
        "email": "p.hussain@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HussainPettiwala.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    {
        "mobile": "9993339993",
        "name": "[3] Aditya Pai",
        "email": "aditya.p@gmail.com",
        "image_url": "https://black-bridge.surge.sh/AdityaPai.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9993339994",
        "name": "[3] Soham Bhoir",
        "email": "soham.b@gmail.com",
        "image_url": "https://black-bridge.surge.sh/SohamBhoir.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    #############################################################################################################
    {
        "mobile": "9992229990",
        "name": "[Network Admin] series 2",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9992229991",
        "name": "[2] Harshal Dave",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9992229992",
        "name": "[2] Hussain Pettiwala",
        "email": "p.hussain@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HussainPettiwala.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    {
        "mobile": "9992229993",
        "name": "[2] Aditya Pai",
        "email": "aditya.p@gmail.com",
        "image_url": "https://black-bridge.surge.sh/AdityaPai.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9992229994",
        "name": "[2] Soham Bhoir",
        "email": "soham.b@gmail.com",
        "image_url": "https://black-bridge.surge.sh/SohamBhoir.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    #############################################################################################################
    {
        "mobile": "9991119990",
        "name": "[Network Admin] series 1",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9991119991",
        "name": "[1] Harshal Dave",
        "email": "dave.h@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HarshalDave.jpg",
        "department": "NSG",
        "rank": "Group Commander",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9991119992",
        "name": "[1] Hussain Pettiwala",
        "email": "p.hussain@gmail.com",
        "image_url": "https://black-bridge.surge.sh/HussainPettiwala.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    {
        "mobile": "9991119993",
        "name": "[1] Aditya Pai",
        "email": "aditya.p@gmail.com",
        "image_url": "https://black-bridge.surge.sh/AdityaPai.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    },
    {
        "mobile": "9991119994",
        "name": "[1] Soham Bhoir",
        "email": "soham.b@gmail.com",
        "image_url": "https://black-bridge.surge.sh/SohamBhoir.jpg",
        "department": "NoidaPolice",
        "rank": "Constable",
        "police_station_name": "Judges Society Police Chauki",
    },
    # {
    #     "mobile": "9994449995",
    #     "name": "Arya Nair",
    #     "email": "Arya.nair@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/AryaNair.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "Constable",
    #     "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    # },
    # {
    #     "mobile": "9994449996",
    #     "name": "Tanvi Panchal",
    #     "email": "vp.tanvi@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/TanviPanchal.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "Inspector",
    #     "police_station_name": "Judges Society Police Chauki",
    # },
    # {
    #     "mobile": "9993339990",
    #     "name": "[Network Admin] series 3",
    #     "email": "shubham.c@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/shubhamchavhan.jpg",
    #     "department": "NSG",
    #     "rank": "Constable",
    #     "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    # },
    # {
    #     "mobile": "9993339991",
    #     "name": "Shubham Chavhan",
    #     "email": "shubham.c@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/shubhamchavhan.jpg",
    #     "department": "NSG",
    #     "rank": "Constable",
    #     "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    # },
    # {
    #     "mobile": "9993339992",
    #     "name": "Deepak Patil",
    #     "email": "patil.deepak@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/deepakpatil.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "DSP",
    #     "police_station_name": "Judges Society Police Chauki",
    # },
    # {
    #     "mobile": "9993339993",
    #     "name": "Sanjay Tawde",
    #     "email": "sanjay.t@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/sanjaytawde.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "Constable",
    #     "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    # },
    # {
    #     "mobile": "9993339994",
    #     "name": "Sandeep Pandey",
    #     "email": "pandey.s@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/sandeeppandey.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "SPG",
    #     "police_station_name": "Judges Society Police Chauki",
    # },
    # {
    #     "mobile": "9993339995",
    #     "name": "Prabhas Shetty",
    #     "email": "prabhas.shetty@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/prabhasshetty.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "Constable",
    #     "police_station_name": "AWHO POLICE CHOWKI THANA BEETA 2",
    # },
    # {
    #     "mobile": "9993339996",
    #     "name": "Sunil Verma",
    #     "email": "sunil.verma@gmail.com",
    #     "image_url": "https://black-bridge.surge.sh/sunilverma.jpg",
    #     "department": "NoidaPolice",
    #     "rank": "Inspector",
    #     "police_station_name": "Judges Society Police Chauki",
    # },
]

police_station_data_list = [
    {
        "name": "AWHO POLICE CHOWKI THANA BEETA 2",
        "address": "Tower 1I , Flat, AWHO APARTMENT, 604, AWHO Rd, Gurjinder Vihar, Pocket 5, Sector Chi 1, AWHO Phase III, Greater Noida, Uttar Pradesh 201310",
        "latitude": "28.44694862130393",
        "longitude": "77.5127514059963"
    },
    {
        "name": "Judges Society Police Chauki",
        "address": "201310, Judge Society, Greater Noida, Uttar Pradesh 201310",
        "latitude": "28.45429560179809",
        "longitude": "77.49852328402679"
    },
]


def create_user(user_data):
    user, created = User.objects.get_or_create(
        phone=user_data['mobile'],
        defaults={
            'name': user_data['name'],
            'email': user_data['email'],
            'image_url': user_data['image_url'],
            'department': user_data['department'],
            'rank': user_data['rank'],
        }
    )
    return user


def create_police_station(station_data):
    station, created = PoliceStation.objects.get_or_create(
        name=station_data['name'],
        defaults={
            'address': station_data['address'],
            'latitude': station_data['latitude'],
            'longitude': station_data['longitude'],
        }
    )
    return station


def get_police_station_by_name(name):
    try:
        return PoliceStation.objects.get(name=name)
    except PoliceStation.DoesNotExist:
        return None


def run():
    # get or create all police stations
    for station_data in police_station_data_list:
        create_police_station(station_data)

    # get or create all users
    for user_data in user_data_list:
        user = create_user(user_data)
        if user_data['police_station_name']:
            station = get_police_station_by_name(
                user_data['police_station_name'])
            if station:
                user.police_station = station
                user.save()
