import { ActionIcon } from '@mantine/core'
import { Edit2, Plus, Save, X } from 'lucide-react'
import React from 'react'
import ExpInput from './ExpInput';
import ExpCard from './ExpCard';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';

const Experience = () => {
  
  const matches = useMediaQuery("(min-width: 475px)");
    const [Exp, setExp] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const profile = useSelector((state: any) => state.profile);
    const handleEdit = () => {
        setEdit(!edit);
    }
  return (
    <div className="">
              <div className="text-2xl font-semibold mb-5 flex justify-between">
                Experience
                <div className="flex gap-2">
                  <ActionIcon
                    onClick={() => setExp(true)}
                    size={matches ? "md" : "lg"}
                    variant="subtle"
                    color="bright-sun.4"
                  >
                    <Plus className="" size="large" />
                  </ActionIcon>
                  <ActionIcon
                    onClick={handleEdit}
                    size={matches ? "md" : "lg"}
                    variant="subtle"
                    color={edit ? "red.8" : "bright-sun.4"}
                  >
                    {edit ? <X className="" /> : <Edit2 className="" />}
                  </ActionIcon>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {profile?.experiences?.map((exp: any, index: any) => (
                  <ExpCard index={index} key={index} {...exp} edit={edit} />
                ))}
                {Exp && <ExpInput setEdit={setExp} add />}
              </div>
            </div>
  )
}

export default Experience