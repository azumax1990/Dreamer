import React, { useState, useCallback } from 'react'
import { Audition } from '../types';

type Props = {
  id:        number;
  auditions: Array<Audition>;
}
export const useSelectAudition = () => {
  const [selectedAudition, setSelectedAudition] = useState<Audition>();

  const onSelectAudition = useCallback((props: Props) => {
    const { id, auditions } = props
    const targetAudition = auditions.find((audition) => audition.id === id )
    setSelectedAudition(targetAudition);
  }, [])

  return { onSelectAudition, selectedAudition }
}
