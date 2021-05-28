# JSON to JAVA

Convert JSON to Java `Map<String,Object>` or `List<Map<String,Object>>`

[DEMO](https://nurgasemetey.com/json-to-java)


# Use cases

- When you need to save JSON to NoSQL each time and don't want to create class for it.
  
For example: you have `Organization` class and `organization` collection on MongoDB.

```java
   String name;
```

And you are asked to add map information that organization could use. It is list of map configurations

One way to solve it:

**Create class**

```java
   String name;
   List<MapInfo> maps;
```

For this you need to create class and keep collection on MongoDB. Too much for just keeping map info.


OR

**Use `Map<String,Object>` or `List<Map<String,Object>>>`**

```java
   String name;
   List<Map<String,Object>> maps;
```

And you have following JSON to persist each time:

```json
[ 
        {
            "default" : true,
            "imageUrl" : "/img/map/osm.png",
            "name" : "OSM Yol",
            "type" : "Tile Layer",
            "url" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }, 
        {
            "default" : false,
            "imageUrl" : "/img/map/yandexsat.png",
            "name" : "Yandex Sat",
            "type" : "Yandex Sat",
            "url" : ""
        }
]
```

This tool will help you to quickly convert JSON to Java `Map<String,Object>`.