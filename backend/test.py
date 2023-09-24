import json

from pyproj import CRS, Transformer
from shapely.geometry import Point
from shapely.ops import transform


# https://gis.stackexchange.com/a/289923
def geodesic_point_buffer(lat, lon, m):
    # Azimuthal equidistant projection
    aeqd_proj = CRS.from_proj4(
        f"+proj=aeqd +lat_0={lat} +lon_0={lon} +x_0=0 +y_0=0")
    tfmr = Transformer.from_proj(aeqd_proj, aeqd_proj.geodetic_crs)
    buf = Point(0, 0).buffer(m)  # distance in metres
    return json.dumps(transform(tfmr.transform, buf).__geo_interface__)
    # return transform(tfmr.transform, buf).exterior.coords[:]


# Example usage
latitude = 19.100343  # Latitude of the center point
longitude = 72.898441  # Longitude of the center point
radius_meters = 200  # Radius in meters

print(geodesic_point_buffer(latitude, longitude, radius_meters))
