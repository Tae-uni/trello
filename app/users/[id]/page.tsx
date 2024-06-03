// basically SPA, using the props. 
// but this component is server component.
const IdPage = ({
    params, // we have params from server component.
}: {
    params: { id: string }
}) => {
    return (
        <div>
            Id: {params.id}
        </div>
    );
};

export default IdPage;