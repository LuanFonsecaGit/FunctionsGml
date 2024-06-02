import os
import subprocess

def convert_to_ogg(input_file, output_file):
    ffmpeg_path = os.getcwd()+r'\ffmpeg\bin\ffmpeg.exe'
    print(ffmpeg_path)
    print()
    try:
        subprocess.run([ffmpeg_path, '-i', input_file, output_file], check=True)
        print(f"Conversão de {input_file} concluída com sucesso!")
    except subprocess.CalledProcessError as e:
        print(f"Erro durante a conversão de {input_file}: {e}")

def convert_all_mp3_to_ogg():
    current_folder = os.getcwd()
    for file in os.listdir(current_folder):
        if file.endswith(".mp3"):
            mp3_file = os.path.join(current_folder, file)
            ogg_file = os.path.join(current_folder, os.path.splitext(file)[0] + ".ogg")
            convert_to_ogg(mp3_file, ogg_file)

if __name__ == "__main__":
    convert_all_mp3_to_ogg()
print("ACABOU")
