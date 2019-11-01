//INITIATE VARIABLES
countryEmpty = "";
salesregionEmpty = "";
industryEmpty = "";
distributorEmpty = "";
countryFilled = "";
salesregionFilled = "";
industryFilled = "";
distributorFilled = "";
//REQUIRED FIELD CONDITIONALS
if("{!Lead.Country}" == ""){countryEmpty = "\n Country";}
if("{!Lead.Sales_Region__c}" == ""){salesregionEmpty = "\n Sales Region";}
if("{!Lead.Industry}" == ""){industryEmpty = "\n Industry";}
if("{!Lead.Associated_Distributor__c}" == ""){distributorEmpty = "\n Associated Distributor";}
if("{!Lead.Country}" !== ""){countryFilled = "\n Country";}
if("{!Lead.Sales_Region__c}" !== ""){salesregionFilled = "\n Sales Region";}
if("{!Lead.Industry}" !== ""){industryFilled = "\n Industry";}
if("{!Lead.Associated_Distributor__c}" !== ""){distributorFilled = "\n Associated Distributor";}
//############ NOT A DISTRIBUTOR ############
if(
  "{!Lead.Distributor__c}" == false &&
  (
    countryEmpty !== "" ||
    salesregionEmpty !== "" ||
    industryEmpty !== "" ||
    distributorEmpty !== ""
  )
)
//TRIGGER ALERT FOR NOT A DISTRIBUTOR
{alert(
  "The following fields need to be filled out before converting a lead that is not a distributor:" +
  countryEmpty +
  salesregionEmpty +
  industryEmpty +
  distributorEmpty
);}
//############ IS A DISTRIBUTOR ############
else if(
  "{!Lead.Distributor__c}" == true &&
  (
    countryFilled !== "" ||
    salesregionFilled !== "" ||
    industryFilled !== "" ||
    distributorFilled !== ""
  )
)
//TRIGGER ALERT FOR IS A DISTRIBUTOR
{alert(
  "The following fields need to be empty before converting a lead that is a distributor:" +
  countryFilled +
  salesregionFilled +
  industryFilled +
  distributorFilled
);}
//GO TO LEAD CONVERSION PAGE IF ALL IS GOOD
else {window.top.location.href = "/lead/leadconvert.jsp?retURL=%2F{!Lead.Id}&id={!Lead.Id}";}
