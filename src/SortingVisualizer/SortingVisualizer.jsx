import React from "react";
import { mergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import './SortingVisualizer.css';
import { quickSortAnimations } from "../sortingAlgorithms/quickSort";
import { bubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Max_Speed = 5;

const Number_Of_bars = 150;

const Primary_colour = 'aqua';

const Secondary_colour = 'lime';

const theme = createTheme ({
    palette: {
        aqua : {
            main: '#00FFFF'
        },
        yellow: {
            main: '#fcba2a'
        }
    }
})
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            array: [],
            arraySize: 10,
            animationSpeed: 4,
        };
    }
    
    componentDidMount() {
        this.resetArray();
    }

    handleAnimationSpeedChange = (event, newValue) => {
        this.setState({ animationSpeed: Max_Speed - newValue });
    };


    handleArraySizeChange = (event, newValue) => {
        this.setState({ arraySize: newValue }, () => {
        this.resetArray();
        });
    };


    resetArray() {
        const array = [];
        for (let i = 0; i < Number_Of_bars; i++) {
            array.push(randomIntFromInterval(5, 1000)); 
        }
        this.setState({ array }, () => {
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = '#fcba2a'
            }
        })
    }

    mergeSort() {
        const animations = mergeSortAnimations(this.state.array);
        this.animateSorting(animations);
    }

    quickSort() {
        const animations = quickSortAnimations(this.state.array);
        this.animateSorting(animations);
    }

    bubbleSort() {
        const animations = bubbleSortAnimations(this.state.array);
        this.animateSorting(animations);
    }

    animateSorting(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const { animationSpeed } = this.state
        for(let i = 0; i < animations.length; i++) {
            const iscolorChange = i % 3 !== 2;
            if(iscolorChange) { 
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 !== 0 ? Primary_colour : Secondary_colour;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeed);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height =  `${newHeight}px`
                }, i * animationSpeed)
            }
        }
    }

    render() {
        const { array, arraySize, animationSpeed } = this.state;

        return (
        <div>
            <div className="array-container"> 
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value}px` }}>
                    </div>
                ))}
            </div>
            <div class = "buttons">
            <ThemeProvider theme = {theme}>
            <Stack spacing={10} direction= "row" marginLeft="28%">
            <Button onClick={() => this.resetArray() } variant = "outlined" color = "yellow">Generate new array</Button>
            <Button onClick={() => this.mergeSort()} variant = "outlined" color = "aqua">Merge Sort</Button>
            <Button onClick={() => this.quickSort()} variant = "outlined" color = "yellow">Quick Sort</Button>
            <Button onClick={() => this.bubbleSort()} variant = "outlined" color = "aqua">Bubble Sort</Button>
                <div>
                    <Slider
                                    value={arraySize}
                                    min={10}
                                    max={100}
                                    onChange={this.handleArraySizeChange}
                                    valueLabelDisplay="auto"
                                    aria-label="array size slider"
                                    color = "yellow"
                                />
                                <Typography variant = "overline" color = "#fcba2a">Array Order</Typography>
                </div>
                <div>
                    <Slider
                                    value={Max_Speed - animationSpeed}
                                    min={0}
                                    max={Max_Speed}
                                    onChange={this.handleAnimationSpeedChange}
                                    valueLabelDisplay="auto"
                                    aria-label="animation speed slider"
                                    color = "aqua"
                                />
                                <Typography variant="overline" color = "#00FFFF">Animation Speed: {Max_Speed - animationSpeed}</Typography>
                </div>
            </Stack>
            </ThemeProvider>
            </div>
        </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
