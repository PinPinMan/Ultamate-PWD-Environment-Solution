const int buttonPin = 2; 
int lastButtonState = LOW;


// ======================== Speech To Text System ========================
void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      Serial.println("PRESSED");
    } else {
      Serial.println("RELEASED");
    }
    lastButtonState = buttonState;
  }
  
  delay(50);  // Debounce delay
}


// ======================== Deaf Alert System ========================
// const int Alert1Pin = 1; 
// const int Alert2Pin = 2; 
// const int LED1Pin = 13; 
// const int LED2Pin = 12; 
// const int RecordPin = 3; 
// const int SpeechToTextPin = 4; 
// int lastButtonState = HIGH;

// bool LED1State = false;
// bool LED2State = false;
// bool lastAlert1State = HIGH;
// bool lastAlert2State = HIGH;


// void setup() {
//   Serial.begin(9600);
//   pinMode(Alert1Pin, INPUT_PULLUP);
//   pinMode(Alert2Pin, INPUT_PULLUP);
//   pinMode(RecordPin, INPUT_PULLUP);
//   pinMode(SpeechToTextPin, INPUT);
//   pinMode(LED1Pin, OUTPUT);
//   pinMode(LED2Pin, OUTPUT);
// }

// void loop() {
//   if (SpeechToTextPin == HIGH) {
//     while (true){
//       int buttonState = digitalRead(RecordPin);
      
//       if (buttonState != lastButtonState) {
//         if (buttonState == LOW) {
//           Serial.println("PRESSED");
//         } else {
//           Serial.println("RELEASED");
//           break;
//         }
//         lastButtonState = buttonState;
//       }
//     }
    
//     delay(50);  // Debounce delay
//   } 
//     // Read the current state of the buttons
//   bool currentAlert1State = digitalRead(Alert1Pin);
//   bool currentAlert2State = digitalRead(Alert2Pin);

//   // Check for Alert1 button press and release
//   if (lastAlert1State == HIGH && currentAlert1State == LOW) {
//     // Button just pressed, do nothing yet
//   } else if (lastAlert1State == LOW && currentAlert1State == HIGH) {
//     // Button just released, toggle LED1
//     LED1State = !LED1State;
//     digitalWrite(LED1Pin, LED1State ? HIGH : LOW);
//   }

//   // Check for Alert2 button press and release
//   if (lastAlert2State == HIGH && currentAlert2State == LOW) {
//     // Button just pressed, do nothing yet
//   } else if (lastAlert2State == LOW && currentAlert2State == HIGH) {
//     // Button just released, toggle LED2
//     LED2State = !LED2State;
//     digitalWrite(LED2Pin, LED2State ? HIGH : LOW);
//   }

//   // Update the last known state of the buttons
//   lastAlert1State = currentAlert1State;
//   lastAlert2State = currentAlert2State;

//   // Small delay to debounce
//   delay(50);
// }

