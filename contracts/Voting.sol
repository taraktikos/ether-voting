pragma solidity ^0.4.22;

contract Voting {
    // candidate name -> vote count
    mapping (bytes32 => uint8) public votesReceived;

    // candidates list
    bytes32[] public candidateList;

    constructor(bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    function getCandidateList() view public returns (bytes32[]) {
        return candidateList;
    }

    function validCandidate(bytes32 candidate) view public returns (bool) {
        for (uint i = 0; i < candidateList.length; i ++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
