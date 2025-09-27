# backend/create_species_database.py
import sqlite3
import json

def create_species_database():
    conn = sqlite3.connect('species_database.db')
    cursor = conn.cursor()
    
    # Create species information table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS species_info (
        id INTEGER PRIMARY KEY,
        species_name TEXT UNIQUE NOT NULL,
        common_name TEXT,
        scientific_name TEXT,
        conservation_status TEXT,
        population_trend TEXT,
        habitat TEXT,
        lifespan_min INTEGER,
        lifespan_max INTEGER,
        average_weight_kg REAL,
        average_height_cm REAL,
        diet TEXT,
        geographic_range TEXT,
        threats TEXT,
        last_seen_location TEXT,
        last_seen_date TEXT,
        iucn_red_list_category TEXT,
        population_estimate TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Insert sample species data
    species_data = [
        {
            'species_name': 'elephant',
            'common_name': 'African Elephant',
            'scientific_name': 'Loxodonta africana',
            'conservation_status': 'Endangered',
            'population_trend': 'Decreasing',
            'habitat': 'Savanna, grasslands, forests',
            'lifespan_min': 60,
            'lifespan_max': 70,
            'average_weight_kg': 4000.0,
            'average_height_cm': 300.0,
            'diet': 'Herbivore',
            'geographic_range': 'Sub-Saharan Africa',
            'threats': 'Poaching, habitat loss, human-wildlife conflict',
            'last_seen_location': 'Kruger National Park, South Africa',
            'last_seen_date': '2024-09-20',
            'iucn_red_list_category': 'EN',
            'population_estimate': '415,000'
        },
        {
            'species_name': 'tiger',
            'common_name': 'Bengal Tiger',
            'scientific_name': 'Panthera tigris',
            'conservation_status': 'Endangered',
            'population_trend': 'Increasing',
            'habitat': 'Tropical forests, grasslands, mangroves',
            'lifespan_min': 10,
            'lifespan_max': 15,
            'average_weight_kg': 220.0,
            'average_height_cm': 110.0,
            'diet': 'Carnivore',
            'geographic_range': 'India, China, Southeast Asia',
            'threats': 'Poaching, habitat fragmentation, prey depletion',
            'last_seen_location': 'Sundarbans, India',
            'last_seen_date': '2024-09-18',
            'iucn_red_list_category': 'EN',
            'population_estimate': '2,500'
        }
        # Add more species...
    ]
    
    for species in species_data:
        cursor.execute('''
        INSERT OR REPLACE INTO species_info 
        (species_name, common_name, scientific_name, conservation_status, 
         population_trend, habitat, lifespan_min, lifespan_max, 
         average_weight_kg, average_height_cm, diet, geographic_range, 
         threats, last_seen_location, last_seen_date, iucn_red_list_category, 
         population_estimate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            species['species_name'], species['common_name'], 
            species['scientific_name'], species['conservation_status'],
            species['population_trend'], species['habitat'],
            species['lifespan_min'], species['lifespan_max'],
            species['average_weight_kg'], species['average_height_cm'],
            species['diet'], species['geographic_range'],
            species['threats'], species['last_seen_location'],
            species['last_seen_date'], species['iucn_red_list_category'],
            species['population_estimate']
        ))
    
    conn.commit()
    conn.close()
    print("Species database created successfully!")

if __name__ == "__main__":
    create_species_database()
