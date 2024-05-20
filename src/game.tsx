import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Game, getEmptyLayer, LayerMatrix } from './game-util'
import * as _ from "lodash"
import "./game.css"


function GameContainer() {
    const layerCount = 20
    const layerSize = 10
    const gameRef = useRef(new Game(10))
    const [, setRenderTime] = useState<number>(1)
    const renderTrigger = useCallback(() => {setRenderTime(num => num + 1)}, [setRenderTime])

    const [layers, setLayers] = useState<LayerMatrix[]>()
    const [coverMap, setCoverMap] = useState<LayerMatrix>(
        getEmptyLayer(layerSize)
    )

    const game = gameRef.current

    useEffect(() => {
        setLayers(game.layers)
    }, [setLayers])

    const updateScene = () => {
        const cards = [...game.cards]
        cards.reverse()
        
        const map = {...coverMap}
        
        renderTrigger()
    }
  return (
    <div>
        <h2>Game - Long 了个 Long</h2>
        <div className="board">
            {coverMap.map((row, y) => (
                <div className="row" key={y}>
                    {row.map((cell,x) => (
                        <div key={x} className="cell">{cell?.content}</div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default GameContainer