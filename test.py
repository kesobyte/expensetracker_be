# from pathlib import Path

# text = "Привіт світ!"

# print(text.encode('utf-8'))
# points = {
#     (0, 1): 2,
#     (0, 2): 3.8,
#     (0, 3): 2.7,
#     (1, 2): 2.5,
#     (1, 3): 4.1,
#     (2, 3): 3.9,
# }


# def calculate_distance(coordinates):
#     c = coordinates
#     coord_len = len(c)
#     if coord_len <= 1:
#         return 0
#     else:
#         distance = 0
#         for i in range(0, coord_len - 1):
#             path_part = (c[i], c[i + 1]) if c[i] < c[i + 1] else (c[i + 1], c[i])
#             print(path_part)
#             distance = distance + points[path_part]
#         return distance

# calculate_distance([0, 1, 3, 2, 0])