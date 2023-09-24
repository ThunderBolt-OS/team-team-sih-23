import math

def calculate_advanced_score_updated(vehicle_info):
    # Calculate age score using an exponential decay function
    age_years = int(vehicle_info["ageOfVehicle"].split()[0])
    age_score = math.exp(-0.1 * age_years) * 100
    
    # Calculate size score using a logistic function
    size_score = 100 / (1 + math.exp(-0.1 * ({"Small": -3, "Medium": 0, "Large": 3}[vehicle_info["sizeOfVehicle"]])))
    
    # Calculate type score using a custom function with an emphasis on eco-friendliness
    def custom_type_score(vehicle_type):
        type_scores = {
            "Electric Bus": 90,
            "CNG Bus": 80,
            "Non-AC Bus": 70,
            "AC Bus": 60,
            "Diesel Bus": 40
        }
        return type_scores.get(vehicle_type, 40)  # Default to 50 if the type is not found
    
    type_score = custom_type_score(vehicle_info["typeOfVehicle"])
    
    # Calculate PUC environmental score using a weighted harmonic mean of CO2 % and hydrocarbon level
    carbon_dioxide_percentage = float(vehicle_info["vehicleInformation"]["detailsOfPUC"]["carbonDioxidePercentage"][:-1])
    hydrocarbon_level_ppm = float(vehicle_info["vehicleInformation"]["detailsOfPUC"]["hydrocarbonLevelPPM"])
    
    # Invert the values to indicate that lower emissions are better
    carbon_dioxide_score = 100 - carbon_dioxide_percentage
    hydrocarbon_score = 100 - hydrocarbon_level_ppm
    
    # Define weights for attributes, giving higher weights to CO2 % and hydrocarbon
    age_weight = 0.2
    size_weight = 0.2
    type_weight = 0.2
    carbon_dioxide_weight = 0.3
    hydrocarbon_weight = 0.1
    
    # Calculate total score
    total_score = (age_score * age_weight + size_score * size_weight + 
                   type_score * type_weight + carbon_dioxide_score * carbon_dioxide_weight + 
                   hydrocarbon_score * hydrocarbon_weight)
    
    # Normalize the score to range from 1 to 100 using a custom function
    def normalize_score(score):
        return (math.atan(score / 50) / (math.pi / 2)) * 99 + 1
    
    final_score = normalize_score(total_score)
    
    return round(final_score, 3)

vehicle_info = {
    "ageOfVehicle": "9 years",
    "sizeOfVehicle": "Small",
    "typeOfVehicle": "Non-AC Bus",
    "vehicleInformation": {
        "detailsOfPUC": {
            "carbonDioxidePercentage": "7.5%",
            "hydrocarbonLevelPPM": 50
        }
    }
}

score = calculate_advanced_score_updated(vehicle_info)
print("Predicted Score:", score)
