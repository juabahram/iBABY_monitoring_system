#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Juanito";
const char* password = "olelaferia";
const char* mqtt_server = "192.168.25.29/";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");

  client.setServer(mqtt_server, 1883);
  while (!client.connected()) {
    if (client.connect("ESP32Client")) {
      Serial.println("Conectado al broker MQTT");
    } else {
      Serial.print("Error de conexión MQTT, rc=");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void loop() {
  // Publicar datos en el tema MQTT
  String payload = "temperatura:23.5";
  client.publish("sensors/temperatura", payload.c_str());
  delay(6000); // Enviar cada minuto
}