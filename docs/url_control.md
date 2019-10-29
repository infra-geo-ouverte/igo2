### 1. To add a layer by URL
* wmsUrl=
* layers=

Example:
* Issue with CORS Access-Control-Allow-Origin
    * https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?wmsUrl=https://ws.mapserver.transports.gouv.qc.ca/swtq&layers=zone_degel
* Without issue:
    * https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?wmsUrl=/apis/ws/swtq&layers=zone_degel
***
### 2. Select Context/thematic
* context=

Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq
***
### 3. Zoom/center
* zoom=
* center=  (longitude, latitude)

Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?zoom=10&center=-71.81136,47.56069600000001
***
### 4. Layer visibility
Based on layer's id. id property could be defined into a layer (context.json) or randomly (uuid) if not set. 

` {`
`  "title": "OSM",`
`  "baseLayer": true,`
`  "id":"osm1",`
`  "sourceOptions": {`
`    "type": "osm"`
`  }`
`    },`

* visiblelayers= (list of id, comma separated values or * (all) )
* invisiblelayers= (list of id, comma separated values or * (all) )

Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&invisiblelayers=*&visiblelayers=bgr_v_centr_servc_geomt_act,bgr_v_sous_route_res_sup_act,satellite
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?invisiblelayers=*&visiblelayers=bb12b9975bbb86d5f5ca36ac4958c6be
***
### 5. Default tool on first openning: 
* tool=


Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=mapDetails
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=about
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=directions
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=searchResults
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=contextManager
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=mapDetails
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=timeAnalysis
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=catalog
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=print
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=shareMap
***
### 6. Search: 
* search=text

Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?search=-73.8870528502633,45.8205452251788&zoom=18
***
### 7. Routing/directions: 
* tool=directions
* routing=     (list of longitude,latitude, semicolon separated values)

Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=directions&routing=-72.4540601953125,47.86101094949734;-70.65092909179685,47.24932843990587
***
### 8. Control layer list (table of content or TOC): 

* llck=keywordToReduceLayersList
    * use metadata keyword list retrieved from metadata/keywordList array or by getCapabilities (WMS/WMTS)
* llca=1 or 0
    * sort TOC alphabetically
* llcv=1 or 0
    * show in TOC, only visible layers
* llcr=1 or 0
    * show in TOC, only layers in scale range


Example:
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&llck=rtss
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&llca=1
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&visiblelayers=bgr_v_sous_route_res_sup_act&llcv=1
* https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&visiblelayers=bgr_v_sous_route_res_sup_act&llcr=1
***