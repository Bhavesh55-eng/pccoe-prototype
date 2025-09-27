# backend/api_integration.py
import requests
import json
from datetime import datetime

class ExternalDataIntegrator:
    def __init__(self):
        self.gbif_api = "https://api.gbif.org/v1"
        self.iucn_api = "https://apiv3.iucnredlist.org/api/v3"
        
    def get_gbif_species_info(self, species_name):
        """Get species occurrence data from GBIF"""
        try:
            # Search for species
            search_url = f"{self.gbif_api}/species/search"
            params = {'q': species_name, 'limit': 1}
            response = requests.get(search_url, params=params)
            
            if response.status_code == 200:
                data = response.json()
                if data['results']:
                    species_key = data['results'][0]['key']
                    
                    # Get occurrence data
                    occurrence_url = f"{self.gbif_api}/occurrence/search"
                    occ_params = {'taxonKey': species_key, 'limit': 10, 'hasCoordinate': 'true'}
                    occ_response = requests.get(occurrence_url, params=occ_params)
                    
                    if occ_response.status_code == 200:
                        occurrences = occ_response.json()['results']
                        return {
                            'recent_locations': [
                                {
                                    'latitude': occ.get('decimalLatitude'),
                                    'longitude': occ.get('decimalLongitude'),
                                    'country': occ.get('country'),
                                    'date': occ.get('eventDate'),
                                    'source': 'GBIF'
                                }
                                for occ in occurrences[:5]
                            ]
                        }
            return {'error': 'Species not found in GBIF'}
        except Exception as e:
            return {'error': f'GBIF API error: {str(e)}'}
    
    def get_iucn_status(self, species_name):
        """Get IUCN Red List status (requires API key)"""
        # Note: IUCN API requires registration and API key
        try:
            # This is a mock implementation - you need to register for IUCN API
            return {
                'red_list_category': 'EN',
                'assessment_date': '2021',
                'population_trend': 'Decreasing',
                'source': 'IUCN Red List'
            }
        except Exception as e:
            return {'error': f'IUCN API error: {str(e)}'}
