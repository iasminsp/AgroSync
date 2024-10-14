<<<<<<< HEAD

=======
// src/app/saude/Menu/layout.tsx
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
import { Stack } from 'expo-router';

export default function MenuLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
