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
    if "gridElements" in response.keys():
        response = processArray(response)
    else:
        response = processException(response["exception"]["code"])   
    return response


def processArray(arrayPass):
    response = arrayPass
    for element in response["gridElements"]:
        element["AMZID"] = scrapmaster.getLinkSection(element["Url"],"dp/","?")
        element["Rank"] =  element["Rank"][1:len(element["Rank"])]
        if element["Price"] != None: 
            element["Currency"] = element["Price"][0:1]
            element["Price"] = element["Price"][1:len(element["Price"])]
        else:
            element["Currency"] = "N/A"
            element["Price"] = "N/A"
        if element["Stars"] != None:
            element["Stars"] = element["Stars"][0:3]
        else:
            element["Stars"] = "NA"
    return response

def validateURL(url):
    return url

def processException(exception):
    exceptionSwitch = {
        "00":{"exception":{"code":"00","description":"The URL you've entered is not valid, please review and try again, make sure that the category shows in your browser when you paste this URL in a different browser tab."}},
        "06":{"exception":{"code":"02","description":"The URL you've entered doesn't appear to be a category page, a category page is either a Best Sellers, New Releases or Movers and Shakers page"}}
    }
    return exceptionSwitch[exception]