import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { CallData } from '../types/calls';
import { ref, update } from 'firebase/database';
import { db } from '../firebaseConfig';
import { FaVolumeUp } from 'react-icons/fa';

interface Message {
  speaker: 'caller' | 'ai';
  text: string;
  delay: number; // milliseconds to wait before showing this message
}

// Pre-scripted emergency conversation
const DEMO_SCRIPT: Message[] = [
  {
    speaker: 'ai',
    text: 'Emergency services, what is your emergency?',
    delay: 1000,
  },
  {
    speaker: 'caller',
    text: "Hi, my name is Lucas. I'm at 501 4th Ave and someone just crashed into my car.",
    delay: 2000,
  },
  {
    speaker: 'ai',
    text: 'I understand, Lucas. Are you or anyone else injured?',
    delay: 2500,
  },
  {
    speaker: 'caller',
    text: "I have my child with me. She looks fine but it's hard to check because my legs are stuck and I cannot move.",
    delay: 3000,
  },
  {
    speaker: 'ai',
    text: 'Stay calm. I am dispatching an ambulance and fire rescue to 501 4th Ave immediately. Can you tell me if you are bleeding?',
    delay: 2500,
  },
  {
    speaker: 'caller',
    text: "I don't know if I'm bleeding or not. Please come as soon as possible!",
    delay: 2000,
  },
  {
    speaker: 'ai',
    text: 'Help is on the way, ETA 4 minutes. Please stay on the line and keep talking to your child to keep her calm. Do not attempt to move.',
    delay: 3000,
  },
  {
    speaker: 'caller',
    text: "Okay, thank you. I'm staying still. My daughter is okay, just scared.",
    delay: 2500,
  },
  {
    speaker: 'ai',
    text: 'Emergency units have been dispatched. Priority level: HIGH. Paramedics are 2 minutes away.',
    delay: 2000,
  },
];

interface DemoCallSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  callData: CallData;
}

// Gemini API TTS function for demo
const speakWithGemini = async (text: string, voice: 'male' | 'female'): Promise<void> => {
  // For demo MVP, we'll use browser's built-in Speech Synthesis API
  // This is simpler and doesn't require Gemini API calls for MVP
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice based on speaker
    const voices = window.speechSynthesis.getVoices();
    if (voice === 'male') {
      // Find male voice with slightly higher rate for panicked tone
      const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Daniel'));
      if (maleVoice) utterance.voice = maleVoice;
      utterance.rate = 1.15; // Slightly faster for panic
      utterance.pitch = 1.1;
    } else {
      // Find female/neutral professional voice
      const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Karen'));
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.rate = 0.95; // Calm, measured pace
      utterance.pitch = 1.0;
    }

    utterance.onend = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
};

export const DemoCallSimulator: React.FC<DemoCallSimulatorProps> = ({ isOpen, onClose, callData }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullTranscript, setFullTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioQueueRef = useRef<boolean>(false);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const callerBg = useColorModeValue('blue.100', 'blue.900');
  const aiBg = useColorModeValue('green.100', 'green.900');

  useEffect(() => {
    if (!isOpen) {
      // Reset on close and stop any speech
      window.speechSynthesis.cancel();
      setMessages([]);
      setCurrentIndex(0);
      setFullTranscript('');
      setIsSpeaking(false);
      return;
    }

    if (currentIndex >= DEMO_SCRIPT.length) {
      // End of script - update call to dispatched
      setTimeout(() => {
        update(ref(db, `/calls/${callData.callSid}`), {
          status: 'DISPATCHED',
          live: false,
        });
      }, 2000);
      return;
    }

    const currentMessage = DEMO_SCRIPT[currentIndex];
    const timer = setTimeout(async () => {
      setMessages((prev) => [...prev, currentMessage]);

      // Update Firebase transcript in real-time using functional update
      setFullTranscript((prevTranscript) => {
        const newTranscript = prevTranscript + ' ' + currentMessage.text;

        update(ref(db, `/calls/${callData.callSid}`), {
          transcript: newTranscript.trim(),
        });

        return newTranscript;
      });

      // Play audio for this message
      setIsSpeaking(true);
      const voiceType = currentMessage.speaker === 'caller' ? 'male' : 'female';
      await speakWithGemini(currentMessage.text, voiceType);
      setIsSpeaking(false);

      setCurrentIndex((prev) => prev + 1);
    }, currentMessage.delay);

    return () => clearTimeout(timer);
  }, [isOpen, currentIndex, callData.callSid]);

  // Load voices on mount
  useEffect(() => {
    // Ensure voices are loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        window.speechSynthesis.getVoices();
      });
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent maxH="80vh">
        <ModalHeader>
          <Flex alignItems="center" gap={3}>
            <Box w={3} h={3} borderRadius="full" bg="red.500" animation="pulse 2s infinite" />
            <Text>Live Call - {callData.name}</Text>
            {isSpeaking && (
              <Flex alignItems="center" gap={2} ml={4}>
                <Icon as={FaVolumeUp} color="green.500" />
                <Text fontSize="sm" color="green.500">Speaking...</Text>
              </Flex>
            )}
            <Badge colorScheme="red" ml="auto">
              LIVE
            </Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} bg={bgColor}>
          <VStack spacing={4} align="stretch" maxH="60vh" overflowY="auto" p={4}>
            {messages.length === 0 && (
              <Text textAlign="center" color="gray.500" fontStyle="italic">
                Connecting to emergency call...
              </Text>
            )}
            {messages.map((message, index) => (
              <HStack
                key={index}
                alignSelf={message.speaker === 'caller' ? 'flex-start' : 'flex-end'}
                maxW="80%"
                spacing={3}
              >
                {message.speaker === 'caller' && (
                  <Avatar size="sm" name={callData.name} bg="blue.500" />
                )}
                <Box
                  bg={message.speaker === 'caller' ? callerBg : aiBg}
                  p={3}
                  borderRadius="lg"
                  boxShadow="md"
                  animation="slideIn 0.3s ease-out"
                >
                  <Text fontSize="sm" fontWeight={message.speaker === 'ai' ? 'semibold' : 'normal'}>
                    {message.text}
                  </Text>
                </Box>
                {message.speaker === 'ai' && (
                  <Avatar size="sm" name="OperatorAI" bg="green.500" />
                )}
              </HStack>
            ))}
          </VStack>
          <style>
            {`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.5;
                }
              }
            `}
          </style>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
