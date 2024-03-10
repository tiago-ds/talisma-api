from gpiozero import AngularServo
from time import sleep


# translate values from 0-100 to 140-180 (servo angle)
def translate_range(value):
  scale_factor = (180 - 140) / 100
  # Translate the value and round to nearest integer
  translated_value = round(scale_factor * value) + 140

  return translated_value

def launchDice(amt):
	amt = translate_range(amt)
	servo = AngularServo(14, min_angle=180, max_angle=0)
	servo.angle = amt
	sleep(2)
	servo.angle = 0
	sleep(0.5)
