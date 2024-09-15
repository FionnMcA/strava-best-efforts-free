import { Activity } from "../models/activity.model";
export class VersionUtils {

    // Method to categorize runs by distance and year
    static categorizeRuns(runs: Activity[]): Map<string, Map<string, Activity[]>> {
        const categorizeRunsByDistance: Map<string, Map<string, Activity[]>> = new Map()
        
        const predefinedDistances = ["5km", "10km", "15km", "Half-Marathon", "30km", "Marathon", "50km", "All Runs"];

        predefinedDistances.forEach(distance => {
            categorizeRunsByDistance.set(distance, new Map());
        })

        // Loop through each run and categorize it by distance and year
        for(const run of runs){
            const distance = this.categorizeByDistance(run.distance / 1000);
            const date = new Date(run.start_date);
            const year = date.getFullYear().toString();

            const allRunsMap = this.getCreateMap(categorizeRunsByDistance, "All Runs", year);
            const categorizedByDistanceRunsMap = this.getCreateMap(categorizeRunsByDistance, distance, year)

            // Add the run to the "All Runs" and categorized distance maps for the specific year
            allRunsMap.get(year)?.push(run)
            categorizedByDistanceRunsMap.get(year)?.push(run)
        }

        return categorizeRunsByDistance;
    }

    // Helper method to get or create a map for a given distance and year
    private static getCreateMap(map: Map<string, Map<string, Activity[]>>, distance: string, year: string){
        let yearMap = map.get(distance);

        if(!yearMap){
            yearMap = new Map<string, Activity[]>();
            map.set(distance, yearMap)
        }

        if(!yearMap.has(year)){
                yearMap.set(year, []);
        }

        console.log(yearMap)
       return yearMap;
    }

    // Method to categorize a run by its distance
    private static categorizeByDistance(runDistance: number){
        const distances = [5, 10, 15, 21.0975, 30, 42.195, 50];
        for(const distance of distances){
            const lowerBound = distance - (distance * 0.025);
            const upperBound = distance + (distance * 0.05);
            if(runDistance >= lowerBound && runDistance <= upperBound){
                if (distance === 21.0975) {
                    return "Half-Marathon"; // Special case for half-marathon
                }
                if (distance === 42.195) {
                    return "Marathon"; // Special case for marathon
                }
                return `${distance}km`
            }
        }
        return runDistance >= 50 ? "50km" : "Uncategorized"
    }
}