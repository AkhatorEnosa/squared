import { COLORS } from '@/constants/colors';
import { SIZES } from '@/constants/sizes';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CheckIcon, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Text, Pressable, View } from 'react-native';

interface ProfileModalProps {
    visible: boolean;
    onClose: () => void;
    onLogout: () => void;
    user: {
        name: string;
    } | null;
}

export const ProfileModal = ({ visible, onClose, onLogout, user }: ProfileModalProps) => {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
            {/* Handle bar for visual cue */}
            <View style={styles.handle} />
            
            {/* name on account  */}
            <Text style={styles.userName}>{user?.name || 'Account'}</Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => (router.push('/profile'), onClose())}>
                <FontAwesome name="user-circle" size={20} color={COLORS.text} />
                <Text style={styles.menuText}>View My Profile</Text>
            </TouchableOpacity>

            {
                confirmDelete ? 
                <View style={[styles.menuItem, { flexDirection: 'row', gap: 10, alignItems: 'center' , display: confirmDelete ? 'flex' : 'none' }]}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.shadow, borderWidth: 1, padding: 5, borderRadius: 50, paddingHorizontal: 40 }} onPress={() => setConfirmDelete(!confirmDelete)}>
                        <X size={SIZES.body2} stroke={COLORS.text}/>
                        <Text style={[styles.menuText, { color: COLORS.text }]}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accentBg, borderWidth: 1,  borderColor: COLORS.accent, padding: 5, borderRadius: 50, paddingHorizontal: 40  }} onPress={onLogout}>
                        <CheckIcon size={SIZES.body2} stroke={COLORS.accent} />
                        <Text style={[styles.menuText, { color: COLORS.accent }]}>Confirm Logout</Text>
                    </TouchableOpacity>
                </View> 
                :
                <TouchableOpacity style={[styles.menuItem, styles.logoutItem, { padding: 5 }]} onPress={() => confirmDelete ? onLogout : setConfirmDelete(!confirmDelete)}>
                    <MaterialIcons name="logout" size={20} color="#FF3B30" />
                    <Text style={[styles.menuText, { color: COLORS.accent }]}>Logout</Text>
                </TouchableOpacity>
            }
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: `${COLORS.border}`,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'semibold',
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 10,
  }
});