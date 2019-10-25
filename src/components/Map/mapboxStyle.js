const MapboxStyle = {
  version: 8,
  name: "Mapbox Breakthrough",
  metadata: {
    "mapbox:origin": "basic-template-v1",
    "mapbox:autocomposite": true,
    "mapbox:type": "template",
    "mapbox:sdk-support": {
      js: "0.54.0",
      android: "7.4.0",
      ios: "4.11.0"
    }
  },
  center: [-101.60911288323507, 42.47917164037753],
  zoom: 7.4737104677701005,
  bearing: 0,
  pitch: 0,
  sources: {
    composite: {
      url: "mapbox://mapbox.mapbox-streets-v7",
      type: "vector"
    }
  },
  sprite:
    "mapbox://sprites/jstodola/cjzis17gx4agr1clmuybhbd21/ck2u8j60r58fu0sgyxrigm3cu",
  glyphs: "mapbox://fonts/jstodola/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      layout: {},
      paint: {
        "background-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          "#153143",
          7,
          "#153143"
        ]
      }
    },
    {
      id: "national_park",
      type: "fill",
      source: "composite",
      "source-layer": "landuse_overlay",
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        ["match", ["get", "class"], ["national_park"], true, false]
      ],
      layout: {
        visibility: "none"
      },
      paint: {
        "fill-color": "hsl(204, 44%, 20%)",
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 5, 0, 6, 0.5]
      }
    },
    {
      id: "landuse",
      type: "fill",
      source: "composite",
      "source-layer": "landuse",
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "match",
          ["get", "class"],
          ["hospital", "park", "pitch", "school"],
          true,
          false
        ]
      ],
      layout: {
        visibility: "none"
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "class"],
          "park",
          "#1d384a",
          "pitch",
          "#1d384a",
          "hospital",
          "#153143",
          "school",
          "#153143",
          "hsla(0, 0%, 0%, 0)"
        ],
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 5, 0, 6, 1]
      }
    },
    {
      id: "waterway",
      type: "line",
      source: "composite",
      "source-layer": "waterway",
      minzoom: 8,
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        ["match", ["get", "class"], ["canal", "river"], true, false]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#0e2a3c",
        "line-width": [
          "interpolate",
          ["exponential", 1.3],
          ["zoom"],
          8.5,
          0.1,
          20,
          8
        ],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0, 8.5, 1]
      }
    },
    {
      id: "water",
      type: "fill",
      source: "composite",
      "source-layer": "water",
      layout: {},
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          "#0e2a3c",
          7,
          "#0e2a3c"
        ]
      }
    },
    {
      id: "aeroway-polygon",
      type: "fill",
      source: "composite",
      "source-layer": "aeroway",
      filter: [
        "all",
        ["match", ["geometry-type"], ["Polygon"], true, false],
        [
          "match",
          ["get", "type"],
          ["helipad", "runway", "taxiway"],
          true,
          false
        ]
      ],
      layout: {},
      paint: {
        "fill-color": "#1d384a"
      }
    },
    {
      id: "aeroway-line",
      type: "line",
      source: "composite",
      "source-layer": "aeroway",
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        ["match", ["get", "type"], ["runway", "taxiway"], true, false]
      ],
      layout: {},
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          10,
          0.5,
          18,
          20
        ],
        "line-color": "#223d4f"
      }
    },
    {
      id: "building",
      type: "fill",
      source: "composite",
      "source-layer": "building",
      minzoom: 15,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "all",
          ["match", ["get", "type"], ["building:part"], false, true],
          ["match", ["get", "underground"], ["false"], true, false]
        ]
      ],
      layout: {},
      paint: {
        "fill-color": "#1d384a",
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 15.5, 0, 16, 1]
      }
    },
    {
      id: "pedestrian-path",
      type: "line",
      source: "composite",
      "source-layer": "road",
      minzoom: 14,
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        [
          "all",
          ["match", ["get", "type"], ["platform"], false, true],
          ["match", ["get", "class"], ["path", "pedestrian"], true, false]
        ]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round",
        visibility: "none"
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          14,
          ["match", ["get", "class"], "pedestrian", 1, "path", 0.75, 0.75],
          20,
          ["match", ["get", "class"], "pedestrian", 8, "path", 5, 5]
        ],
        "line-color": [
          "match",
          ["get", "type"],
          "sidewalk",
          "#223d4f",
          "crossing",
          "#223d4f",
          "#223d4f"
        ]
      }
    },
    {
      id: "tunnel",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        [
          "all",
          ["match", ["get", "type"], ["service:parking_aisle"], false, true],
          ["match", ["get", "structure"], ["tunnel"], true, false],
          [
            "match",
            ["get", "class"],
            [
              "link",
              "motorway",
              "motorway_link",
              "primary",
              "secondary",
              "service",
              "street",
              "street_limited",
              "tertiary",
              "track",
              "trunk"
            ],
            true,
            false
          ]
        ]
      ],
      layout: {
        "line-join": "round"
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          5,
          [
            "match",
            ["get", "class"],
            "motorway",
            0.5,
            "trunk",
            0.5,
            "primary",
            0.5,
            "secondary",
            0.01,
            "tertiary",
            0.01,
            "street",
            0,
            "street_limited",
            0,
            "motorway_link",
            0,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          12,
          [
            "match",
            ["get", "class"],
            "motorway",
            3,
            "trunk",
            3,
            "primary",
            3,
            "secondary",
            2,
            "tertiary",
            2,
            "street",
            0.5,
            "street_limited",
            0.5,
            "motorway_link",
            0.5,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          18,
          [
            "match",
            ["get", "class"],
            "motorway",
            30,
            "trunk",
            30,
            "primary",
            30,
            "secondary",
            24,
            "tertiary",
            24,
            "street",
            12,
            "street_limited",
            12,
            "motorway_link",
            12,
            "service",
            10,
            "track",
            10,
            "link",
            10,
            10
          ]
        ],
        "line-color": [
          "match",
          ["get", "class"],
          "street",
          "#456173",
          "street_limited",
          "#456173",
          "service",
          "#456173",
          "track",
          "#456173",
          "link",
          "#456173",
          "#456173"
        ],
        "line-dasharray": [0.2, 0.2]
      }
    },
    {
      id: "road",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        [
          "all",
          ["match", ["get", "type"], ["service:parking_aisle"], false, true],
          ["match", ["get", "structure"], ["bridge", "tunnel"], false, true],
          [
            "match",
            ["get", "class"],
            [
              "link",
              "motorway",
              "motorway_link",
              "primary",
              "secondary",
              "service",
              "street",
              "street_limited",
              "tertiary",
              "track",
              "trunk"
            ],
            true,
            false
          ]
        ]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          5,
          [
            "match",
            ["get", "class"],
            "motorway",
            0.5,
            "trunk",
            0.5,
            "primary",
            0.5,
            "secondary",
            0.01,
            "tertiary",
            0.01,
            "street",
            0,
            "street_limited",
            0,
            "motorway_link",
            0,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          12,
          [
            "match",
            ["get", "class"],
            "motorway",
            3,
            "trunk",
            3,
            "primary",
            3,
            "secondary",
            2,
            "tertiary",
            2,
            "street",
            0.5,
            "street_limited",
            0.5,
            "motorway_link",
            0.5,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          18,
          [
            "match",
            ["get", "class"],
            "motorway",
            30,
            "trunk",
            30,
            "primary",
            30,
            "secondary",
            24,
            "tertiary",
            24,
            "street",
            12,
            "street_limited",
            12,
            "motorway_link",
            12,
            "service",
            10,
            "track",
            10,
            "link",
            10,
            10
          ]
        ],
        "line-color": [
          "match",
          ["get", "class"],
          "street",
          "#456173",
          "street_limited",
          "#223d4f",
          "service",
          "#223d4f",
          "track",
          "#223d4f",
          "link",
          "#223d4f",
          "#456173"
        ],
        "line-opacity": 1
      }
    },
    {
      id: "bridge-case",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        [
          "all",
          ["match", ["get", "type"], ["service:parking_aisle"], false, true],
          ["match", ["get", "structure"], ["bridge"], true, false],
          [
            "match",
            ["get", "class"],
            [
              "link",
              "motorway",
              "motorway_link",
              "primary",
              "secondary",
              "service",
              "street",
              "street_limited",
              "tertiary",
              "track",
              "trunk"
            ],
            true,
            false
          ]
        ]
      ],
      layout: {
        "line-join": "round"
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          10,
          1,
          16,
          2
        ],
        "line-color": "#223d4f",
        "line-gap-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          5,
          [
            "match",
            ["get", "class"],
            "motorway",
            0.5,
            "trunk",
            0.5,
            "primary",
            0.5,
            "secondary",
            0.01,
            "tertiary",
            0.01,
            "street",
            0,
            "street_limited",
            0,
            "motorway_link",
            0,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          12,
          [
            "match",
            ["get", "class"],
            "motorway",
            3,
            "trunk",
            3,
            "primary",
            3,
            "secondary",
            2,
            "tertiary",
            2,
            "street",
            0.5,
            "street_limited",
            0.5,
            "motorway_link",
            0.5,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          18,
          [
            "match",
            ["get", "class"],
            "motorway",
            30,
            "trunk",
            30,
            "primary",
            30,
            "secondary",
            24,
            "tertiary",
            24,
            "street",
            12,
            "street_limited",
            12,
            "motorway_link",
            12,
            "service",
            10,
            "track",
            10,
            "link",
            10,
            10
          ]
        ]
      }
    },
    {
      id: "bridge",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        [
          "all",
          ["match", ["get", "type"], ["service:parking_aisle"], false, true],
          ["match", ["get", "structure"], ["bridge"], true, false],
          [
            "match",
            ["get", "class"],
            [
              "link",
              "motorway",
              "motorway_link",
              "primary",
              "secondary",
              "service",
              "street",
              "street_limited",
              "tertiary",
              "track",
              "trunk"
            ],
            true,
            false
          ]
        ]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          5,
          [
            "match",
            ["get", "class"],
            "motorway",
            0.5,
            "trunk",
            0.5,
            "primary",
            0.5,
            "secondary",
            0.01,
            "tertiary",
            0.01,
            "street",
            0,
            "street_limited",
            0,
            "motorway_link",
            0,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          12,
          [
            "match",
            ["get", "class"],
            "motorway",
            3,
            "trunk",
            3,
            "primary",
            3,
            "secondary",
            2,
            "tertiary",
            2,
            "street",
            0.5,
            "street_limited",
            0.5,
            "motorway_link",
            0.5,
            "service",
            0,
            "track",
            0,
            "link",
            0,
            0
          ],
          18,
          [
            "match",
            ["get", "class"],
            "motorway",
            30,
            "trunk",
            30,
            "primary",
            30,
            "secondary",
            24,
            "tertiary",
            24,
            "street",
            12,
            "street_limited",
            12,
            "motorway_link",
            12,
            "service",
            10,
            "track",
            10,
            "link",
            10,
            10
          ]
        ],
        "line-color": [
          "match",
          ["get", "class"],
          "street",
          "#223d4f",
          "street_limited",
          "#223d4f",
          "service",
          "#223d4f",
          "track",
          "#223d4f",
          "link",
          "#223d4f",
          "#223d4f"
        ]
      }
    },
    {
      id: "admin-state-province",
      type: "line",
      source: "composite",
      "source-layer": "admin",
      minzoom: 2,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "all",
          ["match", ["get", "maritime"], [0], true, false],
          [">=", ["get", "admin_level"], 3]
        ]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": [
          "step",
          ["zoom"],
          "hsla(203, 15%, 48%, 0.75)",
          4,
          "hsla(203, 15%, 48%, 0.75)"
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 7, 0.75, 12, 1.5],
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          2,
          0,
          3,
          0.5,
          5,
          1
        ],
        "line-dasharray": [8, 4]
      }
    },
    {
      id: "admin-country",
      type: "line",
      source: "composite",
      "source-layer": "admin",
      minzoom: 1,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "all",
          ["<=", ["get", "admin_level"], 2],
          ["match", ["get", "disputed"], [0], true, false],
          ["match", ["get", "maritime"], [0], true, false]
        ]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round",
        visibility: "none"
      },
      paint: {
        "line-color": "hsl(203, 15%, 68%)",
        "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.5, 10, 2]
      }
    },
    {
      id: "admin-country-disputed",
      type: "line",
      source: "composite",
      "source-layer": "admin",
      minzoom: 1,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "all",
          ["<=", ["get", "admin_level"], 2],
          ["match", ["get", "disputed"], [1], true, false],
          ["match", ["get", "maritime"], [0], true, false]
        ]
      ],
      layout: {
        "line-join": "round",
        visibility: "none"
      },
      paint: {
        "line-color": "hsl(203, 15%, 68%)",
        "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.5, 10, 2],
        "line-dasharray": [1.5, 1.5]
      }
    },
    {
      id: "road-label",
      type: "symbol",
      source: "composite",
      "source-layer": "road_label",
      minzoom: 12,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "match",
          ["get", "class"],
          [
            "link",
            "motorway",
            "pedestrian",
            "primary",
            "secondary",
            "street",
            "street_limited",
            "tertiary",
            "trunk"
          ],
          true,
          false
        ]
      ],
      layout: {
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          [
            "match",
            ["get", "class"],
            "motorway",
            10,
            "trunk",
            10,
            "primary",
            10,
            "secondary",
            10,
            "tertiary",
            10,
            9
          ],
          20,
          [
            "match",
            ["get", "class"],
            "motorway",
            15,
            "trunk",
            15,
            "primary",
            15,
            "secondary",
            15,
            "tertiary",
            15,
            14
          ]
        ],
        "text-max-angle": 30,
        "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
        "symbol-placement": "line",
        "text-padding": 1,
        visibility: "none",
        "text-rotation-alignment": "map",
        "text-pitch-alignment": "viewport",
        "text-field": ["get", "name_en"]
      },
      paint: {
        "text-color": "hsla(0, 0%, 0%, 0)",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 1,
        "text-opacity": 0
      }
    },
    {
      id: "poi-label",
      type: "symbol",
      source: "composite",
      "source-layer": "poi_label",
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        ["<=", ["get", "scalerank"], 3]
      ],
      layout: {
        "text-line-height": 1.1,
        "text-size": ["interpolate", ["linear"], ["zoom"], 10, 11, 18, 13],
        "icon-image": ["concat", ["get", "maki"], "-11"],
        "text-max-angle": 38,
        "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
        "text-padding": 2,
        visibility: "none",
        "text-offset": [0, 0.75],
        "text-anchor": "top",
        "text-field": ["get", "name_en"],
        "text-max-width": 8
      },
      paint: {
        "text-color": "hsla(38, 19%, 29%, 0)",
        "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
        "text-halo-width": 1,
        "text-halo-blur": 0.5,
        "text-opacity": 0,
        "icon-opacity": 0
      }
    },
    {
      id: "airport-label",
      type: "symbol",
      source: "composite",
      "source-layer": "airport_label",
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        ["<=", ["get", "scalerank"], 2]
      ],
      layout: {
        "text-line-height": 1.1,
        "text-size": ["interpolate", ["linear"], ["zoom"], 10, 12, 18, 18],
        "icon-image": [
          "step",
          ["zoom"],
          ["concat", ["get", "maki"], "-11"],
          13,
          ["concat", ["get", "maki"], "-15"]
        ],
        "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
        "text-padding": 2,
        visibility: "none",
        "text-offset": [0, 0.75],
        "text-anchor": "top",
        "text-field": [
          "step",
          ["zoom"],
          ["get", "ref"],
          14,
          ["get", "name_en"]
        ],
        "text-max-width": 9
      },
      paint: {
        "text-color": "hsla(38, 19%, 29%, 0)",
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 1,
        "text-opacity": 0,
        "icon-opacity": 0
      }
    },
    {
      id: "place-neighborhood-suburb-label",
      type: "symbol",
      source: "composite",
      "source-layer": "place_label",
      minzoom: 12,
      maxzoom: 15,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        ["match", ["get", "type"], ["neighbourhood", "suburb"], true, false]
      ],
      layout: {
        "text-field": ["get", "name_en"],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.15,
        "text-max-width": 8,
        "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
        "text-padding": 3,
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 11, 16, 16],
        visibility: "none"
      },
      paint: {
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 1,
        "text-color": "hsla(38, 62%, 21%, 0)",
        "text-opacity": 0
      }
    },
    {
      id: "place-town-village-hamlet-label",
      type: "symbol",
      source: "composite",
      "source-layer": "place_label",
      minzoom: 6,
      maxzoom: 14,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        ["match", ["get", "type"], ["hamlet", "town", "village"], true, false]
      ],
      layout: {
        "text-size": ["interpolate", ["linear"], ["zoom"], 15, 10, 20, 22],
        "text-font": [
          "step",
          ["zoom"],
          ["literal", ["Roboto Regular", "Arial Unicode MS Regular"]],
          12,
          [
            "match",
            ["get", "type"],
            "town",
            ["literal", ["Roboto Medium", "Arial Unicode MS Regular"]],
            ["literal", ["Roboto Regular", "Arial Unicode MS Regular"]]
          ]
        ],
        "text-max-width": 7,
        "text-field": ["get", "name_en"],
        visibility: "none"
      },
      paint: {
        "text-color": "#ffffff",
        "text-halo-blur": 0.5,
        "text-halo-color": "#0e2a3c",
        "text-halo-width": 2,
        "text-opacity": 0
      }
    },
    {
      id: "place-city-label-minor",
      type: "symbol",
      source: "composite",
      "source-layer": "place_label",
      minzoom: 1,
      maxzoom: 14,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "all",
          ["!", ["has", "scalerank"]],
          ["match", ["get", "type"], ["city"], true, false]
        ]
      ],
      layout: {
        "text-size": ["interpolate", ["linear"], ["zoom"], 5, 12, 16, 22],
        "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
        "text-max-width": 10,
        "text-field": ["get", "name_en"],
        "text-transform": "uppercase",
        visibility: "none"
      },
      paint: {
        "text-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          "#ffffff",
          6,
          "#ffffff"
        ],
        "text-halo-blur": 0.5,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2,
        "text-opacity": 0
      }
    },
    {
      id: "place-city-label-major",
      type: "symbol",
      source: "composite",
      "source-layer": "place_label",
      minzoom: 1,
      maxzoom: 14,
      filter: [
        "all",
        [
          "match",
          ["geometry-type"],
          ["Polygon", "LineString", "Point"],
          true,
          false
        ],
        [
          "all",
          ["match", ["get", "type"], ["city"], true, false],
          ["has", "scalerank"]
        ]
      ],
      layout: {
        "text-transform": "uppercase",
        "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
        "text-max-width": 10,
        "text-field": ["get", "name_en"],
        visibility: "none"
      },
      paint: {
        "text-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          "#ffffff",
          6,
          "#ffffff"
        ],
        "text-halo-blur": 0.5,
        "text-halo-color": "#0e2a3c",
        "text-halo-width": 4,
        "text-opacity": 0
      }
    },
    {
      id: "directions-truckload",
      type: "line",
      source: "composite",
      "source-layer": "road",
      layout: {
        visibility: "none"
      },
      paint: {
        "line-color": "hsl(193, 76%, 52%)"
      }
    },
    {
      id: "road copy",
      type: "line",
      source: "composite",
      "source-layer": "road",
      filter: [
        "all",
        ["match", ["geometry-type"], ["LineString"], true, false],
        [
          "all",
          ["match", ["get", "type"], ["service:parking_aisle"], false, true],
          ["match", ["get", "structure"], ["bridge", "tunnel"], false, true],
          [
            "match",
            ["get", "class"],
            [
              "link",
              "motorway",
              "motorway_link",
              "primary",
              "secondary",
              "service",
              "street",
              "street_limited",
              "tertiary",
              "track",
              "trunk"
            ],
            true,
            false
          ]
        ]
      ],
      layout: {
        "line-join": "round",
        "line-cap": "round",
        visibility: "none"
      },
      paint: {
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          5,
          [
            "match",
            ["get", "class"],
            "motorway",
            0.5,
            "trunk",
            0.5,
            "primary",
            0.5,
            "secondary",
            0.01,
            "tertiary",
            0.01,
            "street",
            0,
            "street_limited",
            0,
            "motorway_link",
            0,
            "service",
            0,
            "track",
            2,
            "link",
            0,
            0
          ],
          12,
          [
            "match",
            ["get", "class"],
            "motorway",
            3,
            "trunk",
            3,
            "primary",
            3,
            "secondary",
            2,
            "tertiary",
            2,
            "street",
            0.5,
            "street_limited",
            0.5,
            "motorway_link",
            0.5,
            "service",
            0,
            "track",
            2,
            "link",
            0,
            0
          ],
          18,
          [
            "match",
            ["get", "class"],
            "motorway",
            30,
            "trunk",
            30,
            "primary",
            30,
            "secondary",
            24,
            "tertiary",
            24,
            "street",
            12,
            "street_limited",
            12,
            "motorway_link",
            12,
            "service",
            10,
            "track",
            12,
            "link",
            10,
            10
          ]
        ],
        "line-color": [
          "match",
          ["get", "class"],
          ["major_rail", "minor_rail", "pedestrian"],
          "hsl(37, 100%, 45%)",
          "hsla(37, 0%, 0%, 0)"
        ],
        "line-opacity": 1
      }
    }
  ],
  created: "2019-08-19T19:12:56.763Z",
  id: "cjzis17gx4agr1clmuybhbd21",
  modified: "2019-08-19T19:12:56.763Z",
  owner: "jstodola",
  visibility: "private",
  draft: false
}

export default MapboxStyle
