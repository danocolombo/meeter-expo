import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource =
        selectedImage !== null
            ? { uri: selectedImage }
            : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
        borderRadius: 999,
    },
});
