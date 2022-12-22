// two functions: checkViewedFeatures and setViewedFeatures
// checkViewedFeatures: check if the feature has been viewed based on the feature name as a key
// setViewedFeatures: set the feature as viewed based on the feature name as a key

// checkViewedFeatures and setViewedFeatures must accept a user object as a parameter
//  otherwise user object may be unsynced with the database (writeback)

import { fetchBackend } from "./fetchBackend";

export const checkViewedFeatures = (user, featureName) => {
    // user.viewedFeatures is currently a string that is an (Array) JSON object
    // convert it to an object to check if the featureName is in the array
    // then return if string in array
    return JSON.parse(user.viewedFeatures).includes(featureName);
};

// will call to _utils/fetchBackend.js to update the database
export const setViewedFeatures = (user, featureName) => {
    // convert user.viewedFeatures array to a string
    let viewedFeatures = JSON.parse(user.viewedFeatures);

    // check if featureName is in the array before pushing
    // this should NOT be necessary, but is a safeguard in case the frontend does not call checkViewedFeatures first
    if (viewedFeatures.includes(featureName)) return;

    viewedFeatures.push(featureName);
    
    // this persists the changes on the browser to prevent the user from seeing the feature announcement again
    // MUST be stringified or else we may parse a JSON object upon checkViewedFeatures or setViewedFeatures
    user.viewedFeatures = JSON.stringify(viewedFeatures);

    const body = {
        viewedFeatures: user.viewedFeatures
    }
    
    fetchBackend(`/users/${user.email}`, "PATCH", body);
}