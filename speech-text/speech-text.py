import sounddevice as sd
import numpy as np
from scipy.io.wavfile import write
import assemblyai as aai
import serial
import time

# ////////////////// Arduino Serial Configuration //////////////////
arduino_port = 'COM10'  # Replace with your Arduino port
baud_rate = 9600


def setup_serial():
    try:
        arduino = serial.Serial(arduino_port, baud_rate)
        time.sleep(2)  # Wait for the connection to initialize
        return arduino
    except serial.serialutil.SerialException as e:
        print(f"Error: {e}")
        return None


# Set up serial communication
arduino = setup_serial()
print("Bot Starting...")

# ////////////////// Function to send message to Arduino //////////////////


def send_to_arduino(message):
    if arduino:
        arduino.write(message.encode("utf-8"))
    else:
        print("Arduino is not connected")


def read_from_arduino(arduino):
    if arduino.in_waiting > 0:
        return arduino.readline().decode("utf-8").strip()
# ////////////////// Function to send message to Arduino //////////////////


# ////////////////// Transcribe the audio file //////////////////
# Audio recording configuration
fs = 44100  # Sample rate
channels = 1

# AssemblyAI configuration
aai.settings.api_key = "875220f77d674364bba1bec25faa025f"
transcriber = aai.Transcriber()


def record_audio():
    print("Recording... Press the button to stop.")
    audio_chunks = []
    chunk_duration = 0.1  # Record in chunks of 100ms
    frames_per_chunk = int(fs * chunk_duration)

    with sd.InputStream(samplerate=fs, channels=channels) as stream:
        while True:
            audio_chunk, overflowed = stream.read(
                frames_per_chunk)  # Read smaller chunks
            audio_chunks.append(audio_chunk)

            button_state = read_from_arduino(arduino)
            if button_state == "RELEASED":
                print("Button released, stopping recording.")
                break

    return np.concatenate(audio_chunks)
# ////////////////// Transcribe the audio file //////////////////


# ////////////////// Speech To Text //////////////////
def save_and_transcribe(audio_data):
    filename = './audio/output.wav'
    write(filename, fs, audio_data)
    print("Audio saved\n\nTranscribing Now... (Please wait)")

    transcript = transcriber.transcribe(filename)
    if transcript.status == aai.TranscriptStatus.error:
        print(transcript.error)
    else:
        print("Transcription:", transcript.text)
        send_to_arduino(transcript.text)
    print("Transcription completed\n\n\n")


# ////////////////// Speech To Text //////////////////
print("Waiting for button press...")
while True:
    button_state = read_from_arduino(arduino)
    if button_state == "PRESSED":
        audio_data = record_audio()
        save_and_transcribe(audio_data)
    time.sleep(0.1)  # Small delay to prevent CPU overuse
