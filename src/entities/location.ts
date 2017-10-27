export class Location {
    constructor(
        public accuracy: number,
        public altitude: number,
        public bearing: number,
        public speed: number,
        public longitude: number,
        public latitude: number,
        public timestamp: number,
    ) {

    }
}