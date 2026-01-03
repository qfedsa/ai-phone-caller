'use client';

import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiWidgetProps {
  agentId: string;
  companyName: string;
}

type CallStatus = 'idle' | 'loading' | 'connecting' | 'active' | 'ended' | 'error';

/**
 * VAPI Widget Component
 * Handles the initialization and management of VAPI voice calls
 * Uses @vapi-ai/web npm package for clean integration
 */
export default function VapiWidget({ agentId, companyName }: VapiWidgetProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const vapiInstanceRef = useRef<Vapi | null>(null);

  // Initialize VAPI instance once on mount
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      setErrorMessage('VAPI-Konfiguration fehlt. Bitte kontaktieren Sie den Support.');
      setCallStatus('error');
      return;
    }

    try {
      console.log('Initializing VAPI with Public Key and Assistant ID:', agentId);
      
      // Create Vapi instance
      const vapi = new Vapi(publicKey);
      vapiInstanceRef.current = vapi;

      // Set up event listeners
      vapi.on('call-start', () => {
        console.log('Call started');
        setCallStatus('active');
      });

      vapi.on('call-end', () => {
        console.log('Call ended');
        setCallStatus('ended');
        setTimeout(() => setCallStatus('idle'), 3000);
      });

      vapi.on('speech-start', () => {
        console.log('Assistant started speaking');
      });

      vapi.on('speech-end', () => {
        console.log('Assistant finished speaking');
      });

      vapi.on('error', (error: any) => {
        console.error('VAPI error:', error);
        setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
        setCallStatus('error');
      });

    } catch (error) {
      console.error('Error initializing VAPI:', error);
      setErrorMessage('Fehler beim Initialisieren des Telefon-Systems.');
      setCallStatus('error');
    }

    // Cleanup on unmount
    return () => {
      if (vapiInstanceRef.current) {
        vapiInstanceRef.current.stop();
      }
    };
  }, [agentId]);

  // Start call handler
  const startCall = async () => {
    if (!vapiInstanceRef.current || !agentId) {
      setErrorMessage('System nicht bereit. Bitte laden Sie die Seite neu.');
      return;
    }

    try {
      setCallStatus('connecting');
      setErrorMessage('');

      console.log('Starting call with Assistant ID:', agentId);
      // Start the call with the assistant ID
      vapiInstanceRef.current.start(agentId);
    } catch (error) {
      console.error('Error starting call:', error);
      setErrorMessage('Anruf konnte nicht gestartet werden. Bitte versuchen Sie es erneut.');
      setCallStatus('error');
    }
  };

  // End call handler
  const endCall = () => {
    if (vapiInstanceRef.current) {
      vapiInstanceRef.current.stop();
    }
  };

  // Get status display text and styling
  const getStatusDisplay = () => {
    switch (callStatus) {
      case 'loading':
        return {
          text: 'Lädt...',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
      case 'connecting':
        return {
          text: 'Verbinde...',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
        };
      case 'active':
        return {
          text: '🎙️ Gespräch aktiv',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        };
      case 'ended':
        return {
          text: 'Gespräch beendet',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
        };
      case 'error':
        return {
          text: 'Fehler',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Sprechen Sie mit Sarah
          </h3>
          <p className="text-gray-600">
            KI-Assistentin von {companyName}
          </p>
        </div>

        {/* Status Display */}
        {statusDisplay && (
          <div className={`${statusDisplay.bgColor} ${statusDisplay.color} px-4 py-3 rounded-lg text-center mb-6 font-medium transition-all`}>
            {statusDisplay.text}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Call Control Buttons */}
        <div className="space-y-3">
          {callStatus === 'idle' || callStatus === 'ended' || callStatus === 'error' ? (
            <button
              onClick={startCall}
              disabled={!agentId}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Anruf starten
              </span>
            </button>
          ) : callStatus === 'active' ? (
            <button
              onClick={endCall}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Anruf beenden
              </span>
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {callStatus === 'connecting' ? 'Verbinde...' : 'Lädt...'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
