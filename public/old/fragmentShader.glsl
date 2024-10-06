uniform float u_intensity;
uniform vec3 u_lightDirection;
uniform vec3 u_lightColor;
uniform float u_lightIntensity;
varying float vDisplacement;

void main() {

  vec3 baseColor = vec3(0.02, 0.02, 0.02);

  vec3 normal = normalize(vec3(0.0, 0.0, 1.0));

  vec3 ambient = 0.1 * baseColor;

  vec3 lightDir = normalize(u_lightDirection);
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 diffuse = diff * u_lightColor * u_lightIntensity * baseColor;

  vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
  vec3 reflectDir = reflect(-lightDir, normal);
  float shininess = 8.0;
  float specularStrength = 1.5;
  float spec = pow(max(dot(viewDirection, reflectDir), 0.0), shininess);
  vec3 specular = specularStrength * spec * u_lightColor * u_lightIntensity;

  vec3 lighting = ambient + diffuse + specular;

  float distort = 2.0 * vDisplacement * u_intensity;
  vec3 color = lighting * (1.0 - distort);

  gl_FragColor = vec4(color, 1.0);
}
