import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import { View, StyleSheet, FlatList } from 'react-native';
import randomPermuteArray from '../utils/RandomPermutation';
import makeLinespaceArray from '../utils/LinespaceArrayGeneration';


export default function CellGrid(props) {
    const [board, setBoard] = useState([]);
    const [nbHidden, setNbHidden] = useState(props.nbRows*props.nbCols);
    const [refreshing, setRefreshing] = useState(false);
    
    const handleRefresh = () => {
        setRefreshing(!refreshing);
    }


    const createBoard = (nbRows, nbCols) => {
        var board = new Array(nbRows)
        for (var rowId = 0; rowId < nbRows; rowId++) {
            board[rowId] = new Array(nbCols);
            for (var colId = 0; colId < nbCols; colId++) {
                board[rowId][colId] = {
                    id: colId+rowId*nbCols,
                    value:0,
                    hidden:true,
                    marked: false
                };
            }
        }
        return board;
    }

    const getRandomMinesIds = (nbMines, board) => {
        var ids = makeLinespaceArray(0,board.length*board[0].length,1);
        ids = randomPermuteArray(ids);
        return ids.slice(0,nbMines);
    }

    const idToCoord = (id, board) => {
        var idMax = board.length;
        return {
            'colId': id - Math.floor(id / idMax)*idMax, 
            'rowId':Math.floor(id / idMax)}
    }

    const putMinesOnBoard = (nbMines, board) => {
        if (board.length * board[0].length > nbMines){
            var minesIds = getRandomMinesIds(nbMines, board);
            minesIds.forEach(mineId => {
                var coords = idToCoord(mineId, board);
                board[coords.rowId][coords.colId].value = 'mined';
            })
        }
        else { //si il y a plus de miens que de cases sur le plateau, on remplit toutes les cases avec des mines
            for (var rowId = 0; rowId < nbRows; rowId++) {
                for (var colId = 0; colId < nbCols; colId++) {
                    board[rowId][colId].value = 'mined';
                }
            }
        }
    }

    const calculateValue = (rowId, colId, board) => {
        var value = 0;
        const directions = [-1,0,1];
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                if (rowId+directions[i]>=0 && rowId+directions[i]<board.length && colId+directions[j]>=0 && colId+directions[j]<board[0].length && board[rowId+directions[i]][colId+directions[j]].value=='mined') { 
                    value=value+1;
                }
            }
        }
        return value;
    }

    const calculateValues = (board) => {
        for (var rowId = 0; rowId < board.length; rowId++) {
            for (var colId = 0; colId < board[0].length; colId++) {
                if (board[rowId][colId].value!='mined') {
                    board[rowId][colId].value = calculateValue(rowId,colId,board);
                }
            }
        }
    }

    const calculateNbHidden = (board) => {
        
        var count = 0;
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j].hidden) {
                    count++
                }
            }
        }
        console.log(count);
        setNbHidden(count);
    }

    const handlePress = (id) => {
        var newBoard = revealInBoard(id, board);
        calculateNbHidden(newBoard);
    }

    const handleLongPress = (id) => {
        var coords = idToCoord(id, board);
        var newBoard = board.slice();
        newBoard[coords.rowId][coords.colId].marked = !newBoard[coords.rowId][coords.colId].marked;
        setBoard(newBoard);
    }

    const revealInBoard = (id, board) => {
        var newBoard = board.slice();
        var coords = idToCoord(id, board);
        if (newBoard[coords.rowId][coords.colId].hidden==true && !newBoard[coords.rowId][coords.colId].marked){
            newBoard[coords.rowId][coords.colId].hidden = false;
            setBoard(newBoard);
            
            
            if (newBoard[coords.rowId][coords.colId].value == 'mined'){
                props.setEndMessage("You lose");
            }
            if (newBoard[coords.rowId][coords.colId].value == 0) {
                
                var directions = [-1,0,1];
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (coords.rowId+directions[i]>=0 && coords.rowId+directions[i]<board.length && coords.colId+directions[j]>=0 && coords.colId+directions[j]<board[0].length){
                            revealInBoard(id+directions[j]+directions[i]*board[0].length, newBoard);
                        }
                    }
                }
            }

        }
        return (newBoard);

    }

    const getValue = (id) => {
        var coords = idToCoord(id, board);
        return board[coords.rowId][coords.colId].value;
    }


    useEffect(() => {
        if (props.reset == 1){
            console.log('reset');
            var initializingBoard = createBoard(props.nbRows, props.nbCols);
            setNbHidden(props.nbCols*props.nbRows);
            putMinesOnBoard(props.nbMines, initializingBoard);
            calculateValues(initializingBoard);
            setBoard(initializingBoard);
            props.endReset();
        }
    })

    useEffect(() => {
        console.log(nbHidden);
        if (nbHidden == props.nbMines && props.endMessage == "") {
            props.setEndMessage("You win");
        }
    }, [nbHidden])


    return (
        <FlatList
        data={board.flat(1)}
        renderItem={({ item }) => (
            
            <Cell getValue={getValue} marked={item.marked} hidden={item.hidden} id={item.id} handlePress={handlePress} handleLongPress={handleLongPress}/>
            
        )}
        numColumns={props.nbCols}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        /> 
        )}




