export interface ILocation {
    placeId: string
    name: string
    address: string
    latitude: number
    longitude: number
    typeList?: [{
        locationType: string
    }]
}