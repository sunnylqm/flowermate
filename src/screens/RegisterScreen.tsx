import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { User } from 'types/types';
import { navigate } from 'utils/navigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { post } from 'utils/request';
import actions from 'reduxState/actions';

interface Props {}
const RegisterScreen = ({ }: Props) => {
  const dispatch = useDispatch();
  const [isSignupInProgress, setIsSignupInProgress] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  let user: User;
  async function signup() {
    setIsSignupInProgress(true);
    try {
      const { data, msg } = await post('/user', {
        username,
        pwd,
        email,
      });
      if (data) {
        user = data;
      } else if (msg) {
        Alert.alert(msg);
      }
    } finally {
      setIsSignupInProgress(false);
    }
    if (user) {
      dispatch(actions.setUser(user));
      setTimeout(() => {
        Alert.alert('注册成功');
      }, 200);
    }
  }
  const readyToSubmit = username && email && pwd.length >= 6;
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <Input
        placeholder="用户名"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon={<Icon name="user" style={styles.icon} />}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="邮箱"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        leftIcon={
          <Icon name="envelope" style={[styles.icon, { fontSize: 18 }]} />
        }
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="密码(最少6位)"
        secureTextEntry
        leftIcon={<Icon name="lock" style={styles.icon} />}
        value={pwd}
        onChangeText={setPwd}
      />
      <Button
        containerStyle={styles.signinButton}
        onPress={signup}
        disabled={isSignupInProgress || !readyToSubmit}
        title="注册"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  signinButton: {
    marginTop: 50,
    width: 192,
    height: 48,
  },
});

export default RegisterScreen;
