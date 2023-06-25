import { css } from '@emotion/react';
import { User } from 'backend-rest/src/model/User';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useCreateUser, useDeleteUser, useUsersList } from '../api/hooks/userHooks';

export const Page2: FC = () => {
    const [newUserName, setNewUserName] = useState('');
    const [offset] = useState(0);
    const { data: users } = useUsersList({ offset, size: 10 });
    const createUser = useCreateUser();
    const deleteUser = useDeleteUser();

    const handleNewUserNameInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setNewUserName(ev.target.value);
    };

    const handleSubmitCreateNewUserForm = async (ev: FormEvent) => {
        ev.preventDefault();

        await createUser({ name: newUserName });
        setNewUserName('');
    };

    const handleDeleteUserButtonClick = async (user: User) => {
        await deleteUser(user.id);
    };

    return (
        <div
            css={css`
                padding: 32px 64px;
            `}
        >
            <form onSubmit={handleSubmitCreateNewUserForm}>
                <input placeholder="名前" value={newUserName} onChange={handleNewUserNameInputChange} />
                <button>追加</button>
            </form>
            <ul>
                {(users?.items ?? []).map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.id}) <button onClick={() => handleDeleteUserButtonClick(user)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
