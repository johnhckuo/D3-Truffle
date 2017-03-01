pragma solidity ^0.4.2;

contract Congress{
    mapping (address => uint) public stakeholderId;
    function getStakeholdersLength() constant returns(uint);
}

contract usingProperty{
    function getPropertiesLength() constant returns(uint);
    function getPartialProperty(uint p_Id) returns(address, uint);
    function getPropertyRating(uint p_Id, uint s_Id) constant returns(uint);
}

contract MainActivity{

    uint[] visitedProperty;
    uint visitedCount = 0;  //in order to ignore the rest of the array elem
    uint[] actualVisitIndex;
    uint origin;

    Congress congress;
    usingProperty property;

    address CongressAddress;
    address PropertyAddress;

    struct Match{
        uint id;
        uint[] actualVisitIndex;
        uint[] involvePropertyId;
    }

    Match[] public matches;

    function MainActivity(address _congressAddress, address _propertyAddress){
      CongressAddress = _congressAddress;
      PropertyAddress = _propertyAddress;

      congress = Congress(CongressAddress);
      property = usingProperty(PropertyAddress);
    }

    function sort(uint[] priorityList, uint[] visitList) returns(uint[]){
      //selection sort

        for (uint i=0; i < priorityList.length; i++)
        {

            uint max_index = i;
            for (uint j=i+1; j<priorityList.length; j++)
                if (priorityList[j] > priorityList[max_index])
                    max_index = j;

            uint temp = priorityList[i];
            priorityList[i] = priorityList[max_index];
            priorityList[max_index] = temp;

            temp = visitList[i];
            visitList[i] = visitList[max_index];
            visitList[max_index] = temp;
        }
        return visitList;
    }

    function getPropertiesLength() constant returns(uint){
        return property.getPropertiesLength();
    }

    function startMatching() constant returns(uint){
        uint length = property.getPropertiesLength();
        uint[] memory priorityList = new uint[](length);
        uint[] memory visitList;

        return visitList[0];

        for (uint i = 0 ; i < length ; i++){
            var (owner, averageRating) = property.getPartialProperty(i);

            uint self_Importance = property.getPropertyRating(visitList[i], congress.stakeholderId(owner));
            uint diff = averageRating - self_Importance;

            priorityList[i] = diff;

            visitList[i] = i;
        }
        //return visitList[0];
        // visitList = sort(priorityList, visitList);
        // actualVisitIndex = new uint[](length);
        //
        // origin = visitList[0];
        //return origin;
    }


    // function startMatching() returns(bytes32 success){
    //     uint length = property.getPropertiesLength();
    //     uint[] memory priorityList = new uint[](length);
    //     uint[] memory visitList;
    //
    //
    //     for (uint i = 0 ; i < length ; i++){
    //         var (owner, averageRating) = property.getPartialProperty(i);
    //
    //         uint self_Importance = property.getPropertyRating(visitList[i], congress.stakeholderId(owner));
    //         uint diff = averageRating - self_Importance;
    //
    //         priorityList[i] = diff;
    //         visitList[i] = i;
    //     }
    //
    //     visitList = sort(priorityList, visitList);
    //     actualVisitIndex = new uint[](length);
    //
    //     origin = visitList[0];
    //     success = tradingMatch(origin);
    // }

    function checkExist(uint elem, uint[] data) returns(bool){
        for (uint i = 0 ; i < data.length; i++){
            if (elem == data[i] && i != 0){
                return true;
            }
        }
        return false;
    }

    function tradingMatch(uint visitNode) returns(bytes32){

        uint[] memory goThroughList;

        //this shoulldn't exist
        uint length = property.getPropertiesLength();
        uint[] memory nullList = new uint[](length);
        //


        var (owner, averageRating) = property.getPartialProperty(visitNode);
        uint self_Importance = property.getPropertyRating(visitNode, congress.stakeholderId(owner));

        for (uint i = 0 ; i < congress.getStakeholdersLength() ; i++){

            uint currentRating = property.getPropertyRating(visitNode, i);
            uint diff = currentRating - self_Importance;
            goThroughList[i] = diff;
        }
        goThroughList = sort(nullList, goThroughList);

        bool flag = false;
        uint visitIndex = 0;

        while (flag){
            flag = checkExist(goThroughList[visitIndex++], visitedProperty);
        }
        visitIndex--;

        if (goThroughList[visitIndex] == origin){
            return "Success";
        }else{
            visitedProperty[visitedCount++] = goThroughList[visitIndex];
            tradingMatch(goThroughList[visitIndex]);
        }

    }


    function initContract(){

    }

}
