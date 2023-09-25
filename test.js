// const token = 'BQDLbKElttEaRE_IdX4UlcYoeJ-uuQylceN00zjamxafmebx_eA3PuZPxC4stz0ZhQsCLjjMYujiM4kG8IA-2t3C-EF_umFodHeIly3MYA_ZuocLZeqZ7Emrl88lpnQYQl9hP-Dsh8SlQ7y-4522EPderKCtAGfUDWrDscrkMxmOGOkzLQu3H2eMNnpucuZNAbAn3tqDSXI6W4tmykugtirT35efi5xe8aM6p-984h-Pu5UgT3Vuz1U1Mzhv-yUnO3wQUwBSm52veukt59nqHvXL';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
//   )).items;
// }



// const topTracks = await getTopTracks();
// console.log(topTracks);
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );