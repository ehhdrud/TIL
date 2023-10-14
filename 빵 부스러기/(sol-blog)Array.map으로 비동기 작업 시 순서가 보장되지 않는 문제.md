responsePlaylist.data 배열에서 요소를 순서대로 꺼내서 HTTP 요청을 보내기 위해 다음과 같은 코드를 작성하였다.

```tsx
const getPlaylists = async () => {
    try {
        const responsePlaylist = await axios.get('/api/playlist', {
            headers: {
                'X-AUTH-TOKEN': token,
            },
        });
        console.log('responsePlaylist.data', responsePlaylist.data);
        // 0: {playlistName: '플레이리스트 A'}
        // 1: {playlistName: '플레이리스트 B'}
        // 2: {playlistName: '플레이리스트 C'}
        // 3: {playlistName: '플레이리스트 D'}

        responsePlaylist.data.map(async (playlist: Playlist) => {
            try {
                const responseVideo = await axios.get(
                    `/api/playlist/${playlist.playlistName}?cursorId=-1&size=5`,
                    {
                        headers: {
                            'X-AUTH-TOKEN': token,
                        },
                    }
                );
                console.log('playlist.playlistName', playlist.playlistName);
                console.log('responseVideo.data', responseVideo.data);
                const videosInPlaylistData: Record<string, VideoInPlaylist[]> = {
                    [playlist.playlistName]: responseVideo.data.values,
                };
                console.log('videosInPlaylistData', videosInPlaylistData);
                setVideosInPlaylist((prevVideosInPlaylist) => [
                    ...prevVideosInPlaylist,
                    videosInPlaylistData,
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('재생목록을 불러오는데 실패했습니다.');
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('재생목록을 불러오는데 실패했습니다.');
    }
};
```

나는 playlistName: '플레이리스트 A'를 이용한 요청이 제일 먼저 이뤄지는 것을 기대했지만, 순서가 보장되지 않고 랜덤으로 요청이 보내졌다.

JavaScript에서 비동기 작업은 순서가 보장되지 않고 여러 개의 비동기 요청이 동시에 시작될 수 있으며, 각 요청이 완료되는 순서는 서버 응답 및 네트워크 지연에 따라 달라질 수 있다.

여러 비동기 작업을 순서대로 실행하려면 각각의 비동기 호출을 기다리는 방법을 사용해야 한다. 그러나 map 함수 내부에서 await 키워드를 사용하더라도 map 함수 자체는 비동기 작업을 기다리지 않고 즉시 모든 요청을 시작하기 때문에 여러 요청이 동시에 이뤄져서 순서가 보장되지 않는 것이었다.

map 대신 아래와 같이 for 루프를 사용하면 비동기 작업이 완료될 때마다 다음 작업을 시작하므로 순서대로 작업을 수행할 수 있다.

```tsx
const getPlaylists = async () => {
    try {
        const responsePlaylist = await axios.get('/api/playlist', {
            headers: {
                'X-AUTH-TOKEN': token,
            },
        });
        console.log('responsePlaylist.data', responsePlaylist.data);
        // 0: {playlistName: '플레이리스트 A'}
        // 1: {playlistName: '플레이리스트 B'}
        // 2: {playlistName: '플레이리스트 C'}
        // 3: {playlistName: '플레이리스트 D'}

        // map 대신 for 루프를 사용
        for (const playlist of responsePlaylist.data) {
            try {
                const responseVideo = await axios.get(
                    `/api/playlist/${playlist.playlistName}?cursorId=-1&size=5`,
                    {
                        headers: {
                            'X-AUTH-TOKEN': token,
                        },
                    }
                );
                console.log('playlist.playlistName', playlist.playlistName);
                console.log('responseVideo.data', responseVideo.data);
                const videosInPlaylistData: Record<string, VideoInPlaylist[]> = {
                    [playlist.playlistName]: responseVideo.data.values,
                };
                console.log('videosInPlaylistData', videosInPlaylistData);
                setVideosInPlaylist((prevVideosInPlaylist) => [
                    ...prevVideosInPlaylist,
                    videosInPlaylistData,
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('재생목록을 불러오는데 실패했습니다.');
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('재생목록을 불러오는데 실패했습니다.');
    }
};
```
