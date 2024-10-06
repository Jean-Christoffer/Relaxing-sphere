varying float vDistance;
uniform vec3 uColor; // Updated to vec3 for full RGB color control

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // Update hue with uColor.x, saturation with uColor.y, value dynamically
    float hue = uColor.x;
    float saturation = 0.7 + 0.3 * uColor.y; // Add some variation to saturation
    float value = 1.0; // Max brightness

    // Convert HSV to RGB
    vec3 color = hsv2rgb(vec3(hue, saturation, value));

    // Calculate strength based on distance from point center
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    // Apply additional blending based on distance for more depth
    color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.2);
    color = mix(vec3(0.0), color, strength);

    // Set the final fragment color
    gl_FragColor = vec4(color, strength);
}
