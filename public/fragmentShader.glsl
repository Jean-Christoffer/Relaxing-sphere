varying float vDistance;
uniform vec3 uColor;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

    float hue = uColor.x;
    float saturation = 0.7 + 0.3 * uColor.y;
    float value = 1.0;

    vec3 color = hsv2rgb(vec3(hue, saturation, value));

    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.2);
    color = mix(vec3(0.0), color, strength);

    gl_FragColor = vec4(color, strength);
}
