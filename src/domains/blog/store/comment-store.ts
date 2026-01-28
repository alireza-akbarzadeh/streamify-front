import { Store } from "@tanstack/store";
import { type Comment, INITIAL_COMMENTS } from "../blog-mock";

export interface CommentState {
	comments: Comment[];
	latestId: number | null;
	isPosting: boolean;
	replyingToId: number | null;
	replyDraft: string;
}

export const commentStore = new Store<CommentState>({
	comments: INITIAL_COMMENTS,
	latestId: null,
	isPosting: false,
	replyingToId: null,
	replyDraft: "",
});

export const commentActions = {
	setReplyingTo: (id: number | null) => {
		commentStore.setState((s) => ({ ...s, replyingToId: id, replyDraft: "" }));
	},
	setReplyDraft: (content: string) => {
		commentStore.setState((s) => ({ ...s, replyDraft: content }));
	},
	addComment: async (content: string, parentId: number | null = null) => {
		if (!content.trim()) return;
		commentStore.setState((s) => ({ ...s, isPosting: true }));

		await new Promise((r) => setTimeout(r, 800));

		const newComment: Comment = {
			id: Date.now(),
			author: { name: "You", avatar: "...", role: "Member" },
			content,
			likes: 0,
			timestamp: "Just now",
			isAdmin: false,
			parentId,
		};

		commentStore.setState((s) => {
			const newList = [...s.comments];
			if (parentId) {
				const idx = newList.findIndex((c) => c.id === parentId);
				newList.splice(idx + 1, 0, newComment);
			} else {
				newList.unshift(newComment);
			}
			return {
				...s,
				comments: newList,
				latestId: newComment.id,
				isPosting: false,
				replyingToId: null,
				replyDraft: "",
			};
		});
	},
};
