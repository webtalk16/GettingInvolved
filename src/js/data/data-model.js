const DateModel = {
    Video: (videoId, uploadDate, dataObj) => {
        // categoryEng, categoryHeb, titleEng, titleHeb, titleFooterEng, titleFooterHeb, videoLink
        // links_FB, links_Web, links_Spotify, links_Insta, links_YouTube, links_LinkedIn, links_Twitter
        return {
            uploadDate: uploadDate,
            eng: {
                category: dataObj.categoryEng.value,
                title: dataObj.titleEng.value,
                title2: dataObj.titleFooterEng.value
            },
            heb: {
                category: dataObj.categoryHeb.value,
                title: dataObj.titleHeb.value,
                title2: dataObj.titleFooterHeb.value
            },
            media:{
                videoLink: dataObj.inputYouTubeLink.value,
                videoEmbed: `<iframe id="video${videoId}" style="width:100%;height:400px;" src="${dataObj.inputYouTubeLink.value}?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            },
            socialLinks: {
                website: dataObj.links_Web.value,
                spotify: dataObj.links_Spotify.value,
                insta: dataObj.links_Insta.value,
                fb: dataObj.links_FB.value,
                twiter: dataObj.links_Twitter.value,
                youTube: dataObj.links_YouTube.value,
                linkedIn: dataObj.links_LinkedIn.value
            }
        };
    },
    RetrievedData: () => {
        return {
            videos: {
                featuredVideos: null
            },
            recentlyDeleted: {
                videos: {}
            }
        };
    }
}

export { DateModel }