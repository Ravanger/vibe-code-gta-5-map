import type { CategoryDefinition, MarkerData } from '../types';

import ammuNationLocations from './locations/ammu_nation.json';
import atmLocations from './locations/atm.json';
import automotiveShopLocations from './locations/automotive_shop.json';
import barberLocations from './locations/barber.json';
import clothingLocations from './locations/clothing.json';
import convenienceStoreLocations from './locations/convenience_store.json';
import foodDrinkLocations from './locations/food_drink.json';
import tattooLocations from './locations/tattoo.json';
import dartsActivities from './activities/darts.json';
import flightSchoolActivities from './activities/flight_school.json';
import golfingActivities from './activities/golfing.json';
import huntingActivities from './activities/hunting.json';
import parachutingActivities from './activities/parachuting.json';
import racesActivities from './activities/races.json';
import shootingActivities from './activities/shooting.json';
import tennisActivities from './activities/tennis.json';
import triathlonActivities from './activities/triathlon.json';
import yogaActivities from './activities/yoga.json';
import cinemaEntertainment from './entertainment/cinema.json';
import stripClubEntertainment from './entertainment/strip_club.json';
import carWashServices from './services/car_wash.json';
import fireStationServices from './services/fire_station.json';
import hospitalServices from './services/hospital.json';
import policeStationServices from './services/police_station.json';
import actionFigureCollectibles from './collectibles/action_figure.json';
import epsilonTractCollectibles from './collectibles/epsilon_tract.json';
import hiddenPackageCollectibles from './collectibles/hidden_package.json';
import knifeFlightCollectibles from './collectibles/knife_flight.json';
import letterScrapCollectibles from './collectibles/letter_scrap.json';
import monkeyMosaicCollectibles from './collectibles/monkey_mosaic.json';
import nuclearWasteCollectibles from './collectibles/nuclear_waste.json';
import peyotePlantCollectibles from './collectibles/peyote_plant.json';
import playingCardCollectibles from './collectibles/playing_card.json';
import spaceshipPartCollectibles from './collectibles/spaceship_part.json';
import strangersFreaksCollectibles from './collectibles/strangers_freaks.json';
import stuntLocationCollectibles from './collectibles/stunt_location.json';
import submarinePartCollectibles from './collectibles/submarine_part.json';
import underTheBridgeCollectibles from './collectibles/under_the_bridge.json';
import buildingPlaces from './places/building.json';
import lookoutPointPlaces from './places/lookout_point.json';
import mountainPeakPlaces from './places/mountain_peak.json';
import propertyPlaces from './places/property.json';
import bodyArmorItems from './items/body_armor.json';
import healthPackItems from './items/health_pack.json';
import vehicleSpawnItems from './items/vehicle_spawn.json';
import weaponPickupItems from './items/weapon_pickup.json';
import gangAttackQuests from './quests/gang_attack.json';
import lennyAveryRealtyQuests from './quests/lenny_avery_realty.json';
import missionQuests from './quests/mission.json';
import randomEventQuests from './quests/random_event.json';
import apartmentOnline from './online/apartment.json';
import bunkerOnline from './online/bunker.json';
import businessOnline from './online/business.json';
import clothingScrapOnline from './online/clothing_scrap.json';
import clubhouseOnline from './online/clubhouse.json';
import executiveOfficeOnline from './online/executive_office.json';
import exoticExportOnline from './online/exotic_export.json';
import facilityOnline from './online/facility.json';
import garageOnline from './online/garage.json';
import hangerOnline from './online/hanger.json';
import nightclubOnline from './online/nightclub.json';
import peyotePlantOnline from './online/peyote_plant.json';
import signalJammerOnline from './online/signal_jammer.json';
import warehouseOnline from './online/warehouse.json';
import easterEggMysteries from './mysteries/easter_egg.json';
import ldOrganicsProductOther from './other/ld_organics_product.json';
import miscellaneousOther from './other/miscellaneous.json';

export const locations: CategoryDefinition[] = [
  {
    id: 'ammu_nation',
    name: 'Ammu-Nation',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: ammuNationLocations as MarkerData[],
    visible: true
    },
  {
    id: 'atm',
    name: 'ATM',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: atmLocations as MarkerData[],
    visible: true
  },
  {
    id: 'automotive_shop',
    name: 'Automotive Shop',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: automotiveShopLocations as MarkerData[],
    visible: true
  },
  {
    id: 'barber',
    name: 'Barber',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: barberLocations as MarkerData[],
    visible: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: clothingLocations as MarkerData[],
    visible: true
  },
  {
    id: 'convenience_store',
    name: 'Convenience Store',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: convenienceStoreLocations as MarkerData[],
    visible: true
  },
  {
    id: 'food_drink',
    name: 'Food & Drink',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: foodDrinkLocations as MarkerData[],
    visible: true
  },
  {
    id: 'tattoo',
    name: 'Tattoo',
    group: 'Locations',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: tattooLocations as MarkerData[],
    visible: true
  }
];

export const activities: CategoryDefinition[] = [
  {
    id: 'darts',
    name: 'Darts',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: dartsActivities as MarkerData[],
    visible: true
  },
  {
    id: 'flight_school',
    name: 'Flight School',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: flightSchoolActivities as MarkerData[],
    visible: true
  },
  {
    id: 'golfing',
    name: 'Golfing',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: golfingActivities as MarkerData[],
    visible: true
  },
  {
    id: 'hunting',
    name: 'Hunting',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: huntingActivities as MarkerData[],
    visible: true
  },
  {
    id: 'parachuting',
    name: 'Parachuting',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: parachutingActivities as MarkerData[],
    visible: true
  },
  {
    id: 'races',
    name: 'Races',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: racesActivities as MarkerData[],
    visible: true
  },
  {
    id: 'shooting',
    name: 'Shooting',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: shootingActivities as MarkerData[],
    visible: true
  },
  {
    id: 'tennis',
    name: 'Tennis',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: tennisActivities as MarkerData[],
    visible: true
  },
  {
    id: 'triathlon',
    name: 'Triathlon',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: triathlonActivities as MarkerData[],
    visible: true
  },
  {
    id: 'yoga',
    name: 'Yoga',
    group: 'Activities',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: yogaActivities as MarkerData[],
    visible: true
  }
];

export const entertainment: CategoryDefinition[] = [
  {
    id: 'cinema',
    name: 'Cinema',
    group: 'Entertainment',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: cinemaEntertainment as MarkerData[],
    visible: true
  },
  {
    id: 'strip_club',
    name: 'Strip Club',
    group: 'Entertainment',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: stripClubEntertainment as MarkerData[],
    visible: true
  }
];

export const services: CategoryDefinition[] = [
  {
    id: 'car_wash',
    name: 'Car Wash',
    group: 'Services',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: carWashServices as MarkerData[],
    visible: true
  },
  {
    id: 'fire_station',
    name: 'Fire Station',
    group: 'Services',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: fireStationServices as MarkerData[],
    visible: true
  },
  {
    id: 'hospital',
    name: 'Hospital',
    group: 'Services',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: hospitalServices as MarkerData[],
    visible: true
  },
  {
    id: 'police_station',
    name: 'Police Station',
    group: 'Services',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: policeStationServices as MarkerData[],
    visible: true
  }
];

export const collectibles: CategoryDefinition[] = [
  {
    id: 'action_figure',
    name: 'Action Figure',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: actionFigureCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'epsilon_tract',
    name: 'Epsilon Tract',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: epsilonTractCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'hidden_package',
    name: 'Hidden Package',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: hiddenPackageCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'knife_flight',
    name: 'Knife Flight',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: knifeFlightCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'letter_scrap',
    name: 'Letter Scrap',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: letterScrapCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'monkey_mosaic',
    name: 'Monkey Mosaic',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: monkeyMosaicCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'nuclear_waste',
    name: 'Nuclear Waste',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: nuclearWasteCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'peyote_plant',
    name: 'Peyote Plant',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: peyotePlantCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'playing_card',
    name: 'Playing Card',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: playingCardCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'spaceship_part',
    name: 'Spaceship Part',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: spaceshipPartCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'strangers_freaks',
    name: 'Strangers & Freaks',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: strangersFreaksCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'stunt_location',
    name: 'Stunt Location',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: stuntLocationCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'submarine_part',
    name: 'Submarine Part',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: submarinePartCollectibles as MarkerData[],
    visible: true
  },
  {
    id: 'under_the_bridge',
    name: 'Under The Bridge',
    group: 'Collectibles',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: underTheBridgeCollectibles as MarkerData[],
    visible: true
  }
];

export const places: CategoryDefinition[] = [
  {
    id: 'building',
    name: 'Building',
    group: 'Places',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: buildingPlaces as MarkerData[],
    visible: true
  },
  {
    id: 'lookout_point',
    name: 'Lookout Point',
    group: 'Places',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: lookoutPointPlaces as MarkerData[],
    visible: true
  },
  {
    id: 'mountain_peak',
    name: 'Mountain Peak',
    group: 'Places',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: mountainPeakPlaces as MarkerData[],
    visible: true
  },
  {
    id: 'property',
    name: 'Property',
    group: 'Places',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: propertyPlaces as MarkerData[],
    visible: true
  }
];

export const items: CategoryDefinition[] = [
  {
    id: 'body_armor',
    name: 'Body Armor',
    group: 'Items',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: bodyArmorItems as MarkerData[],
    visible: true
  },
  {
    id: 'health_pack',
    name: 'Health Pack',
    group: 'Items',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: healthPackItems as MarkerData[],
    visible: true
  },
  {
    id: 'vehicle_spawn',
    name: 'Vehicle Spawn',
    group: 'Items',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: vehicleSpawnItems as MarkerData[],
    visible: true
  },
  {
    id: 'weapon_pickup',
    name: 'Weapon Pickup',
    group: 'Items',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: weaponPickupItems as MarkerData[],
    visible: true
  }
];

export const quests: CategoryDefinition[] = [
  {
    id: 'gang_attack',
    name: 'Gang Attack',
    group: 'Quests',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: gangAttackQuests as MarkerData[],
    visible: true
  },
  {
    id: 'lenny_avery_realty',
    name: 'Lenny Avery Realty',
    group: 'Quests',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: lennyAveryRealtyQuests as MarkerData[],
    visible: true
  },
  {
    id: 'mission',
    name: 'Mission',
    group: 'Quests',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: missionQuests as MarkerData[],
    visible: true
  },
  {
    id: 'random_event',
    name: 'Random Event',
    group: 'Quests',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: randomEventQuests as MarkerData[],
    visible: true
  }
];

export const online: CategoryDefinition[] = [
  {
    id: 'apartment',
    name: 'Apartment',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: apartmentOnline as MarkerData[],
    visible: true
  },
  {
    id: 'bunker',
    name: 'Bunker',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: bunkerOnline as MarkerData[],
    visible: true
  },
  {
    id: 'business',
    name: 'Business',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: businessOnline as MarkerData[],
    visible: true
  },
  {
    id: 'clothing_scrap',
    name: 'Clothing Scrap',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: clothingScrapOnline as MarkerData[],
    visible: true
  },
  {
    id: 'clubhouse',
    name: 'Clubhouse',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: clubhouseOnline as MarkerData[],
    visible: true
  },
  {
    id: 'executive_office',
    name: 'Executive Office',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: executiveOfficeOnline as MarkerData[],
    visible: true
  },
  {
    id: 'exotic_export',
    name: 'Exotic Export',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: exoticExportOnline as MarkerData[],
    visible: true
  },
  {
    id: 'facility',
    name: 'Facility',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: facilityOnline as MarkerData[],
    visible: true
  },
  {
    id: 'garage',
    name: 'Garage',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: garageOnline as MarkerData[],
    visible: true
  },
  {
    id: 'hanger',
    name: 'Hanger',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: hangerOnline as MarkerData[],
    visible: true
  },
  {
    id: 'nightclub',
    name: 'Nightclub',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: nightclubOnline as MarkerData[],
    visible: true
  },
  {
    id: 'peyote_plant_online',
    name: 'Peyote Plant',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: peyotePlantOnline as MarkerData[],
    visible: true
  },
  {
    id: 'signal_jammer',
    name: 'Signal Jammer',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: signalJammerOnline as MarkerData[],
    visible: true
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    group: 'Online',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: warehouseOnline as MarkerData[],
    visible: true
  }
];

export const mysteries: CategoryDefinition[] = [
  {
    id: 'easter_egg',
    name: 'Easter Egg',
    group: 'Mysteries',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: easterEggMysteries as MarkerData[],
    visible: true
  }
];

export const other: CategoryDefinition[] = [
  {
    id: 'ld_organics_product',
    name: 'LD Organics Product',
    group: 'Other',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: ldOrganicsProductOther as MarkerData[],
    visible: true
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    group: 'Other',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: miscellaneousOther as MarkerData[],
    visible: true
  }
];

export const categories: CategoryDefinition[] = [
  ...locations,
  ...activities,
  ...entertainment,
  ...services,
  ...collectibles,
  ...places,
  ...items,
  ...quests,
  ...online,
  ...mysteries,
  ...other,
];
