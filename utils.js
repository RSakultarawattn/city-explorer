

function geoMunge(geoData) {
    try {
        const firstItem = geoData[0];
        return {
            formatted_query: firstItem.display_name,
            latitude: firstItem.lat,
            longitude: firstItem.lon
        };
    } catch (e) {
        return {};
    }
}

module.exports = {
    geoMunge
};

