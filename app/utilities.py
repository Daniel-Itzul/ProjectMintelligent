from app import app
import scrapmaster
import json

AMZN_CAT_LIST_INT = {
                    "type":"1",
                    "url":"",
                    "elementSet":{"etag":"li","eclass":"zg-item-immersion"},
                    "elementDef":[
                        {"elementName":"Rank","elementTag":"span","elementClass":"zg-badge-text","extractType":"0","elementExtract":"text"},
                        {"elementName":"Url","elementTag":"a","elementClass":"a-link-normal","extractType":"1","elementExtract":"href"},
                        {"elementName":"Description","elementTag":"div","elementClass":"p13n-sc-truncate","extractType":"0","elementExtract":"text"},
                        {"elementName":"Price","elementTag":"span","elementClass":"p13n-sc-price","extractType":"0","elementExtract":"text"},
                        {"elementName":"Stars","elementTag":"span","elementClass":"a-icon-alt","extractType":"0","elementExtract":"text"}
                        ]
                    }


def prepareResponse(url):
    request = AMZN_CAT_LIST_INT
    url = validateURL(url)
    request["url"] = url
    response = json.loads(scrapmaster.scrapGrid(request))
    response = processArray(response)
    return response


def processArray(arrayPass):
    response = arrayPass
    for element in response["gridElements"]:
        element["AMZID"] = scrapmaster.getLinkSection(element["Url"],"dp/","?")
    return response

def validateURL(url):
    return url