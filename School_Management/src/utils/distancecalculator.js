function computeDistance(latA, lonA, latB, lonB) {
  const degToRad = (angle) => (angle * Math.PI) / 180;

  const earthRadius = 6371;
  const deltaLat = degToRad(latB - latA);
  const deltaLon = degToRad(lonB - lonA);

  const haversineFormula =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(degToRad(latA)) *
      Math.cos(degToRad(latB)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const centralAngle =
    2 *
    Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));

  return earthRadius * centralAngle;
}

module.exports = computeDistance;
