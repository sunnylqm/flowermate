import React from 'react';
import { Feed, ReduxState, User } from 'types/types';
import dayjs from 'dayjs';
import { View, Text, StyleSheet, Image } from 'react-native';
import ZoomImage from 'components/ZoomImage';
import { getImageUrl, getUserAvatar, screenWidth } from 'utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { selectDataState } from 'reduxState/selectors';
import { post } from 'utils/request';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  item: Feed;
  user: User;
}

function FeedItem({ item, user }: Props) {
  const { images, createdAt, desc, user: author } = item;
  const fromNow = dayjs(createdAt).fromNow();

  const [feedLikes, setFeedLikes] = React.useState(
    item.feedLikes?.map(({ userId }) => userId) || [],
  );
  const likedByMe = feedLikes.includes(user.id);
  async function likeFeed(feedId: string) {
    const { ok } = await post('/feedlike', {
      feedId,
      action: likedByMe ? 'unlike' : 'like',
    });
    if (ok) {
      if (likedByMe) {
        setFeedLikes(feedLikes.filter((userId) => userId != user.id));
      } else {
        setFeedLikes(feedLikes.concat(user.id));
      }
    }
  }
  return (
    <View style={styles.container}>
      <Image style={styles.authorAvatar} source={getUserAvatar(author)} />
      <View style={styles.content}>
        <Text style={styles.authorName}>{author.username}</Text>
        {!!desc && <Text style={styles.desc}>{desc}</Text>}
        <View style={styles.imagesContainer}>
          {images?.map((imageUri, i) => (
            <ZoomImage
              key={i}
              source={{ uri: getImageUrl(imageUri) }}
              style={styles.image}
            />
          ))}
        </View>
        <View style={styles.metaTextContainer}>
          <Text style={styles.metaText}>{fromNow}</Text>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => likeFeed(item.id)}
          >
            <Icon
              style={[styles.likeIcon, likedByMe && styles.activeLikeIcon]}
              name={likedByMe ? 'heart' : 'heart-o'}
            />
            <Text style={styles.metaText}>{feedLikes.length || ''}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const imageWidth = (screenWidth - 85) / 3;
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  content: {
    flex: 1,
  },
  author: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    marginBottom: 6,
    color: '#0645AD',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    marginRight: 5,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 16,
    marginBottom: 8,
  },
  metaTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metaText: {
    fontSize: 13,
    color: 'grey',
    marginRight: 10,
  },
  link: {
    color: '#0645AD',
  },
  likeButton: {
    flexDirection: 'row',
  },
  likeIcon: {
    fontSize: 15,
    color: 'grey',
    marginRight: 10,
  },
  activeLikeIcon: {
    color: 'red',
  },
});

const mapStateToProps = (state: ReduxState) => {
  return {
    user: selectDataState(state).user!,
  };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
