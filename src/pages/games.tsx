import { loadGames } from "../lib/load-games"

function Games({ games }: { games: Array<{id: number, name: string}> }){
    console.log("our games:", games )
    return (
        <ul>
            {games.map(({id, name}) => <>
                <li key={id}>{name}</li>
            </>)} 
        </ul>
    )
}

export async function getServerSideProps() {
    const games = await loadGames();

    return {
        props: {
            games,
        },
    }
}

export default Games