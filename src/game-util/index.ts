import _ from "lodash";
import { CardItemValue, colorType, contentType } from "./types";
export type LayerMatrix = Array<Array<CardItem | null>>

export type Position = {
    x: number, y: number, z: number
}
export class CardItem {
    val: CardItemValue;
    position: Position;
    content?: string;
    style: Partial<StyleSheet>;
    constructor(val: CardItemValue) {
        this.val = val
        this.position = { x: 0, y: 0, z: 0 }
        this.style = {} // TODO: 
    }

    setPosition(p: Position) {
        this.position = { ...p }
    }
    setValue(val: CardItemValue) {
        this.val = val;
        this.content = contentType[val];
        Object.assign(this.style, colorType[val]);
    }
}


export const getEmptyLayer = (layerSize: number): LayerMatrix =>
    _.fill(new Array(layerSize), (() => _.fill(new Array(layerSize), null))())

export const generateCards = (cardsNum: number): CardItem[] => {
    let leftCardsNum = cardsNum * 3
    const cards = []

    while (leftCardsNum > 0) {
        const value = Math.floor(Math.random() * 14) + 1 as CardItemValue
        cards.push(new CardItem(value), new CardItem(value), new CardItem(value))
        leftCardsNum -= 3
    }
    const tempList = [...cards];
    const listLength = tempList.length;
    for (let i = 0; i < listLength; i++) {
        const j = Math.ceil(Math.random() * listLength);
        const tempItem = tempList[i];
        tempList[i] = tempList[j];
        tempList[j] = tempItem;
    }
    return tempList
}


export const fillLayersWithCards = (cards: CardItem[], layerCount: number = 20, layerSize: number = 10) => {
    const layers = _.fill(
        new Array(layerCount),
        (() => getEmptyLayer(layerSize))()
    )
    let index = 0
    const cardRandom = 0.3

    console.log("layers11", layers)
    for (let z = 0; z < layerCount; z++) {
        const shrinkSpped = 3
        const shrink = Math.floor((layerCount - z - 1) / shrinkSpped)
        const shrinkX = Math.min(Math.floor(layerSize) - 2, shrink)
        const shrinkY = Math.min(Math.floor(layerSize) - 2, shrink)


        for (let y = shrinkY; y < layerSize - 1 - shrinkY; y++) {
            for (let x = shrinkX; x < Math.ceil(layerSize - 1) / 2; x++) {
                if (index >= cards.length) return layers
                let canSetCard = true;
                if (x > 0 && layers[z][y][x - 1]) {
                    // left
                    canSetCard = false
                } else if (y > 0 && layers[z][y - 1][x]) {
                    // top
                    canSetCard = false
                } else if (y > 0 && x > 0 && layers[z][y - 1][x - 1]) {
                    // left top
                    canSetCard = false
                } else if (z > 0 && layers[z][y][x]) {
                    // current
                    canSetCard = false
                } else if (Math.random() >= cardRandom) {
                    canSetCard = false
                }

                if (canSetCard) {
                    index += 1
                    const card = cards[index]
                    layers[z][y][x] = card
                    card.setPosition({ x, y, z })
                    // put a card on the other side
                    const mirrorX = layerSize - 2 - x
                    if (mirrorX > x) {
                        index += 1
                        const card = cards[index]
                        layers[z][y][mirrorX] = card
                        card.setPosition({ x: mirrorX, y, z })
                    }
                }
            }
        }
    }
    return layers
}

export class Game {
    cards: CardItem[];
    layers: LayerMatrix[];
    constructor(cardsNum: number) {
        this.cards = generateCards(cardsNum)
        this.layers = []
        this.initGame()
    }

    initGame() {
        this.layers = fillLayersWithCards(this.cards)
    }
}
