# import os
# import platform

# # Dossier contenant les images
# folder_path = './images'
# extension = '.jpg'

# # Fonction pour récupérer la date de création réelle (selon le système d'exploitation)
# def get_creation_time(path):
#     if platform.system() == 'Windows':
#         return os.path.getctime(path)  # Windows : date de création réelle
#     else:
#         stat = os.stat(path)
#         try:
#             return stat.st_birthtime  # macOS
#         except AttributeError:
#             return stat.st_mtime  # Linux fallback : utilise date de modification

# # Récupérer tous les fichiers .jpg avec leur chemin
# jpg_files = [
#     os.path.join(folder_path, f)
#     for f in os.listdir(folder_path)
#     if f.lower().endswith(extension)
# ]

# # Trier par date de création
# jpg_files.sort(key=get_creation_time)

# # Renommer les fichiers
# for index, file_path in enumerate(jpg_files, start=1):
#     new_name = f"hm{index}.jpg"
#     new_path = os.path.join(folder_path, new_name)
#     os.rename(file_path, new_path)

# print("✅ Renommage terminé par date de création.")