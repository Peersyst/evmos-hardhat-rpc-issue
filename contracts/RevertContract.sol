pragma solidity ^0.8.0;

error RevertingConstructor();

contract RevertContract {

    constructor() {
        revert RevertingConstructor();
    }
   
}