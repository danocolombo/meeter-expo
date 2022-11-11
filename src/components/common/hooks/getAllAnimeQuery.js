import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const animeURL = 'https://api.jikan.moe/v4/anime';
const popsURL =
    'https://datausa.io/api/data?drilldowns=Nation&measures=Population';

const getAllAnime = async () => {
    const response = await axios.get(popsURL);
    return response;
};
// export const UseGetAllAnime = () => {
//     return  useQuery({
//         queryKey: ["allAnime"],
//         queryFn: async () => {
//             const { data } = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       return data;
//             }
// });
export function UsePosts() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data } = await axios.get(
                'https://jsonplaceholder.typicode.com/posts'
            );
            return data;
        },
    });
}
