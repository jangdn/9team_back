import numpy as np
import pandas as pd
import sklearn
from sklearn.cluster import KMeans
import pymongo

conn = pymongo.MongoClient('localhost', 27017)

db = conn.get_database('SEdb')
collection = db.get_collection('recommand')

data = pd.read_csv('data.csv', index_col = "users")

kmeans = KMeans(n_clusters = 5, random_state = 0).fit(data)
data['label'] = kmeans.labels_

grouped = data.groupby('label')
item_mean_g = grouped.agg(np.mean)
item_mean_g['best'] = item_mean_g.idxmax(axis=1)

for i in item_mean_g.best :
	collection.insert({"itemId" : i})
